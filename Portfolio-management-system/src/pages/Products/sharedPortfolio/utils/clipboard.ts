export function copyToClipboard(
  url: string,
  onSuccess: () => void,
  onFallback: () => void,
): void {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(url)
      .then(() => onSuccess())
      .catch(() => fallbackCopy(url, onSuccess, onFallback));
  } else {
    fallbackCopy(url, onSuccess, onFallback);
  }
}

function fallbackCopy(
  url: string,
  onSuccess: () => void,
  onFallback: () => void,
): void {
  const textArea = document.createElement("textarea");
  textArea.value = url;
  textArea.style.position = "fixed";
  textArea.style.left = "-999999px";
  textArea.style.top = "-999999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
    onSuccess();
  } catch (err) {
    console.error("Failed to copy text: ", err);
    onFallback();
  }

  document.body.removeChild(textArea);
}
