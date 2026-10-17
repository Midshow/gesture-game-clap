package com.midshow.hezhang;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.util.Base64;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import java.io.ByteArrayInputStream;
import java.io.OutputStream;

public final class MainActivity extends Activity {
    private static final String PAGE = "https://appassets.androidplatform.net/assets/index.html";
    private WebView web;
    private byte[] pendingImage;

    @Override public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        web = new WebView(this);
        web.setOnApplyWindowInsetsListener((view, insets) -> {
            if (android.os.Build.VERSION.SDK_INT >= 30) {
                android.graphics.Insets bars = insets.getInsets(android.view.WindowInsets.Type.systemBars() | android.view.WindowInsets.Type.displayCutout());
                view.setPadding(bars.left, bars.top, bars.right, bars.bottom);
            } else {
                view.setPadding(insets.getSystemWindowInsetLeft(), insets.getSystemWindowInsetTop(), insets.getSystemWindowInsetRight(), insets.getSystemWindowInsetBottom());
            }
            return insets;
        });
        web.setBackgroundColor(0xfff3eddf);
        web.getSettings().setJavaScriptEnabled(true);
        web.getSettings().setDomStorageEnabled(true);
        web.getSettings().setAllowFileAccess(false);
        web.getSettings().setAllowContentAccess(false);
        web.getSettings().setMediaPlaybackRequiresUserGesture(true);
        web.setWebChromeClient(new WebChromeClient());
        web.addJavascriptInterface(new ExportBridge(), "HezhangExport");
        web.setWebViewClient(new WebViewClient() {
            @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                try {
                    if (PAGE.equals(request.getUrl().toString()))
                        return new WebResourceResponse("text/html", "UTF-8", getAssets().open("index.html"));
                } catch (Exception ignored) { }
                return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found", null, new ByteArrayInputStream(new byte[0]));
            }
            @Override public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
                Uri uri = request.getUrl();
                return !("https".equals(uri.getScheme()) && "appassets.androidplatform.net".equals(uri.getHost()) && "/assets/index.html".equals(uri.getPath()));
            }
            @Override public void onPageFinished(WebView view, String url) {
                if (!PAGE.equals(url)) return;
                // The original game exports PNG blobs through a.click(); keep its source unchanged.
                view.evaluateJavascript("(function(){if(window.__hezhangExportReady)return;window.__hezhangExportReady=true;" +
                    "var click=HTMLAnchorElement.prototype.click;HTMLAnchorElement.prototype.click=function(){" +
                    "if(this.download&&this.href.startsWith('blob:')){var name=this.download;" +
                    "fetch(this.href).then(r=>r.blob()).then(b=>{var reader=new FileReader();" +
                    "reader.onload=()=>HezhangExport.savePng(String(reader.result),name);reader.readAsDataURL(b);" +
                    "}).catch(()=>alert('战报导出失败，请重试'));return;}return click.call(this);};" +
                    "try{Object.defineProperty(navigator,'share',{value:undefined,configurable:true});}catch(e){}" +
                    "})();", null);
            }
        });
        setContentView(web);
        web.loadUrl(PAGE);
    }

    private final class ExportBridge {
        @JavascriptInterface public void savePng(String data, String name) {
            if (data == null || !data.startsWith("data:image/png;base64,") || data.length() > 24 * 1024 * 1024) return;
            try {
                final byte[] image = Base64.decode(data.substring(data.indexOf(',') + 1), Base64.DEFAULT);
                if (image.length < 8 || image[0] != (byte)137 || image[1] != 80 || image[2] != 78 || image[3] != 71) return;
                runOnUiThread(() -> {
                    if (pendingImage != null) return;
                    pendingImage = image;
                    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("image/png");
                    intent.putExtra(Intent.EXTRA_TITLE, "合掌-战报.png");
                    try { startActivityForResult(intent, 1); }
                    catch (Exception e) { pendingImage = null; Toast.makeText(MainActivity.this, "无法打开保存窗口", Toast.LENGTH_LONG).show(); }
                });
            } catch (Exception ignored) { }
        }
    }

    @Override protected void onActivityResult(int request, int result, Intent data) {
        super.onActivityResult(request, result, data);
        if (request != 1) return;
        byte[] image = pendingImage;
        pendingImage = null;
        if (result != RESULT_OK || data == null || data.getData() == null || image == null) return;
        try (OutputStream out = getContentResolver().openOutputStream(data.getData())) {
            if (out == null) throw new java.io.IOException("No output stream");
            out.write(image);
            Toast.makeText(this, "战报已保存", Toast.LENGTH_SHORT).show();
        } catch (Exception e) { Toast.makeText(this, "战报保存失败", Toast.LENGTH_LONG).show(); }
    }

    @Override public void onBackPressed() {
        web.evaluateJavascript("(function(){var d=document.querySelector('dialog[open]');if(!d)return false;var e=new Event('cancel',{cancelable:true});if(d.dispatchEvent(e))d.close();return true;})()", handled -> {
            if (!"true".equals(handled)) new AlertDialog.Builder(this).setMessage("退出合掌？当前对局不会保存。")
                .setNegativeButton("继续游戏", null).setPositiveButton("退出", (d, w) -> finish()).show();
        });
    }

    @Override protected void onPause() { super.onPause(); web.onPause(); }
    @Override protected void onResume() { super.onResume(); if (web != null) web.onResume(); }
    @Override protected void onDestroy() { web.destroy(); super.onDestroy(); }
}
