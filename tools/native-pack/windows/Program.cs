using System;
using System.IO;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Windows.Forms;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.WinForms;

internal static class Program
{
    internal static string Bundle;
    internal static string Data;
    [DllImport("kernel32.dll", CharSet = CharSet.Unicode)]
    private static extern bool SetDllDirectory(string path);

    [STAThread]
    private static void Main()
    {
        try
        {
            Data = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "Hezhang");
            Bundle = Path.Combine(Data, "bundles", BuildInfo.ContentHash);
            Directory.CreateDirectory(Bundle);
            foreach (string name in new[] { "WebView2Loader.dll" })
            {
                string path = Path.Combine(Bundle, name);
                if (!File.Exists(path))
                    using (var input = Assembly.GetExecutingAssembly().GetManifestResourceStream(name))
                    using (var output = new FileStream(path, FileMode.CreateNew)) input.CopyTo(output);
            }
            AppDomain.CurrentDomain.AssemblyResolve += (sender, args) =>
            {
                string name = new AssemblyName(args.Name).Name + ".dll";
                using (var stream = Assembly.GetExecutingAssembly().GetManifestResourceStream(name))
                {
                    if (stream == null) return null;
                    using (var bytes = new MemoryStream()) { stream.CopyTo(bytes); return Assembly.Load(bytes.ToArray()); }
                }
            };
            SetDllDirectory(Bundle);
            Run();
        }
        catch (Exception ex) { MessageBox.Show(ex.Message, "合掌启动失败"); }
    }

    [MethodImpl(MethodImplOptions.NoInlining)]
    private static void Run()
    {
        Application.EnableVisualStyles();
        Application.SetCompatibleTextRenderingDefault(false);
        Application.Run(new GameWindow());
    }
}

internal sealed class GameWindow : Form
{
    private readonly WebView2 web = new WebView2();
    public GameWindow()
    {
        AutoScaleDimensions = new System.Drawing.SizeF(96, 96);
        AutoScaleMode = AutoScaleMode.Dpi;
        Text = "合掌 " + BuildInfo.Version;
        Width = 1180; Height = 820; MinimumSize = new System.Drawing.Size(390, 600);
        StartPosition = FormStartPosition.CenterScreen;
        web.Dock = DockStyle.Fill;
        Controls.Add(web);
        Shown += Initialize;
    }

    [StructLayout(LayoutKind.Sequential)]
    private struct DpiBounds { public int Left, Top, Right, Bottom; }

    protected override void WndProc(ref Message message)
    {
        // The single-file .NET Framework host has no app.config opt-in for WinForms
        // dynamic DPI layout. Apply Windows' suggested bounds on monitor changes;
        // the docked WebView2 then renders its surface at the new monitor DPI.
        if (message.Msg == 0x02E0 && message.LParam != IntPtr.Zero) // WM_DPICHANGED
        {
            var bounds = (DpiBounds)Marshal.PtrToStructure(message.LParam, typeof(DpiBounds));
            base.WndProc(ref message);
            SetBounds(bounds.Left, bounds.Top, bounds.Right - bounds.Left, bounds.Bottom - bounds.Top);
            return;
        }
        base.WndProc(ref message);
    }

    private async void Initialize(object sender, EventArgs args)
    {
        try
        {
            var environment = await CoreWebView2Environment.CreateAsync(null, Path.Combine(Program.Data, "profile"));
            await web.EnsureCoreWebView2Async(environment);
            web.CoreWebView2.AddWebResourceRequestedFilter("https://hezhang.local/*", CoreWebView2WebResourceContext.All);
            web.CoreWebView2.WebResourceRequested += (s, e) =>
            {
                var uri = new Uri(e.Request.Uri);
                bool isPage = uri.AbsolutePath == "/index.html" || uri.AbsolutePath == "/";
                // Serve the embedded HTML through the host; renderer file permissions
                // must not decide whether a previously extracted cache can be read.
                Stream content = isPage ? Assembly.GetExecutingAssembly().GetManifestResourceStream("index.html") : new MemoryStream();
                e.Response = environment.CreateWebResourceResponse(content, isPage ? 200 : 404,
                    isPage ? "OK" : "Not Found", "Content-Type: text/html; charset=utf-8\r\nCache-Control: no-store");
            };
            web.CoreWebView2.Settings.AreHostObjectsAllowed = false;
            web.CoreWebView2.Settings.IsStatusBarEnabled = false;
            web.CoreWebView2.NavigationStarting += (s, e) =>
            {
                Uri uri;
                if (!Uri.TryCreate(e.Uri, UriKind.Absolute, out uri) || uri.Scheme != "https" || uri.Host != "hezhang.local") e.Cancel = true;
            };
            web.CoreWebView2.NewWindowRequested += (s, e) => { e.Handled = true; };
            web.CoreWebView2.Navigate("https://hezhang.local/index.html");
        }
        catch (WebView2RuntimeNotFoundException)
        {
            MessageBox.Show("请先安装 Microsoft Edge WebView2 Evergreen 运行库，再打开合掌。\n\n下载地址：https://developer.microsoft.com/microsoft-edge/webview2/\n\n安装后，游戏可以离线运行。", "缺少网页运行库");
            Close();
        }
        catch (Exception ex)
        {
            File.WriteAllText(Path.Combine(Program.Data, "startup-error.log"), ex.ToString());
            MessageBox.Show(ex.Message, "合掌加载失败"); Close();
        }
    }
}
