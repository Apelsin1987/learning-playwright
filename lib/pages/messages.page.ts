import { type Locator, type Page, expect } from "@playwright/test";
import { ContactPage } from "@pages/contact.page";

export class MessagesPage {
  readonly page: Page;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.table = page.getByRole("table").filter({ hasText: "Subject" });
  }

  async goto() {
    await this.page.goto("/account/messages");
  }

  async createMessage(subject: string, message: string) {
    const contactPage = new ContactPage(this.page);
    await contactPage.goto();
    await contactPage.sendMessage(subject, message);
  }

  async createReply(subject: string, message: string, replyMessage: string) {
    await expect(this.table).toBeVisible();
    const messageRow = this.table
      .locator("tr")
      .filter({
        hasText: subject,
      })
      .filter({
        hasText: message.substring(0, 25),
      });
    await expect(messageRow).toBeVisible();

    const detailsButton = messageRow.getByRole("link", { name: "Details" });
    await expect(detailsButton).toBeVisible();
    await detailsButton.click();

    const messageCard = this.page
      .locator("div.card")
      .filter({ hasText: "Subject:" });
    await expect(messageCard).toContainText(subject);
    await expect(messageCard).toContainText(message);

    const replyInput = this.page.getByTestId("message");
    await replyInput.fill(replyMessage);

    const replyButton = this.page.getByTestId("reply-submit");
    await replyButton.click();

    const replyCard = this.page
      .getByRole("heading", { name: "Replies" })
      .locator("+ div.card");
    await expect(replyCard).toContainText(replyMessage);
  }
}
