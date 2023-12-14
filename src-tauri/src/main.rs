// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::path::Path;

use image::Luma;
use qrcode::QrCode;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![qr])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn qr(text: String, path: String) {
    let content = text.as_bytes().to_vec();

    let code = QrCode::new(&content).expect("QRコード作成エラー");

    output(&code, path);
}

fn output(code: &QrCode, path: String) {
    let image = code.render::<Luma<u8>>().build();

    let path = Path::new(&path);

    if let Err(_) = image.save(path) {
        eprintln!("画像の保存に失敗");
    }
}
