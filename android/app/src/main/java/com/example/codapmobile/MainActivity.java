package com.example.codapmobile;

import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;

import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Aktifkan edge-to-edge: konten akan menggambar di belakang system bars
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);

        // Buat status bar dan navigation bar sepenuhnya transparan
        getWindow().setStatusBarColor(Color.TRANSPARENT);
        getWindow().setNavigationBarColor(Color.TRANSPARENT);

        // Nonaktifkan enforced contrast pada navigation bar (API 29+)
        getWindow().setNavigationBarContrastEnforced(false);

        // Sembunyikan semua system bars untuk mode imersif
        hideSystemUI();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) {
            // Pastikan system bars tetap tersembunyi saat jendela mendapatkan fokus kembali
            hideSystemUI();
        }
    }

    private void hideSystemUI() {
        Window window = getWindow();
        View decorView = window.getDecorView();

        // Gunakan WindowInsetsControllerCompat (API modern pengganti SYSTEM_UI_FLAG yang deprecated)
        WindowInsetsControllerCompat controller =
                WindowCompat.getInsetsController(window, decorView);

        // Sembunyikan status bar dan navigation bar
        controller.hide(WindowInsetsCompat.Type.systemBars());

        // Atur behavior: bars muncul sementara saat swipe dari edge, lalu hilang otomatis
        controller.setSystemBarsBehavior(
                WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
}
