# 제미나이 "이미지 복사"로 클립보드에 들어온 그림을 out\raw\<이름>.png 로 저장 (엣지가 연속 다운로드를 막을 때 대신 씀)
# 사용법: powershell -File C:\ozwork\tools\clip_img.ps1 이름     (그다음 bash grab_img.sh 이름 re)
param([string]$name)
Add-Type -AssemblyName System.Windows.Forms, System.Drawing
for ($i = 0; $i -lt 10; $i++) {
  $img = [System.Windows.Forms.Clipboard]::GetImage()
  if ($img) { break }; Start-Sleep -Milliseconds 800
}
if (-not $img) { Write-Output "클립보드에 그림 없음"; exit 1 }
$img.Save("C:\ozwork\out\raw\$name.png", [System.Drawing.Imaging.ImageFormat]::Png)
Write-Output "$name $($img.Width)x$($img.Height)"
[System.Windows.Forms.Clipboard]::Clear()
