import { strToU8, zipSync } from "fflate";

const FOLDER = "AI_AGENT_MARKDOWN";

/** Tải xuống một file .zip chứa các file markdown trong thư mục AI_AGENT_MARKDOWN/. */
export function downloadAgentMarkdownZip(
  files: Record<string, string>,
  zipBaseName: string,
): void {
  const mapped: Record<string, Uint8Array> = {};
  for (const [name, content] of Object.entries(files)) {
    mapped[`${FOLDER}/${name}`] = strToU8(content);
  }
  const zipped = zipSync(mapped, { level: 6 });
  const blob = new Blob([zipped], { type: "application/zip" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${zipBaseName}.zip`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
