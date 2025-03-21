/**
 * Utility function to safely copy text to clipboard with fallback
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Check if the Clipboard API is supported
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not supported");
    }

    // Try to write using the Clipboard API
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    // Fallback: Create a temporary textarea element
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;

      // Make the textarea invisible
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";

      document.body.appendChild(textarea);
      textarea.select();

      // Execute the copy command
      document.execCommand("copy");

      // Clean up
      document.body.removeChild(textarea);
      return true;
    } catch (fallbackError) {
      console.error("Failed to copy text:", fallbackError);
      return false;
    }
  }
}
