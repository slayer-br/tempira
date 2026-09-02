let feedbackTimeoutId: number | null = null;

/**
 * Exibe um banner de feedback ou aviso ao usuário com autoclose.
 */
export function showFeedback(
  bannerElement: HTMLElement,
  message: string,
  durationMs = 3500
): void {
  if (feedbackTimeoutId !== null) {
    window.clearTimeout(feedbackTimeoutId);
    feedbackTimeoutId = null;
  }

  bannerElement.textContent = message;
  bannerElement.className = "feedback-banner feedback-error";
  bannerElement.style.display = "block";

  feedbackTimeoutId = window.setTimeout(() => {
    bannerElement.style.display = "none";
    feedbackTimeoutId = null;
  }, durationMs);
}
