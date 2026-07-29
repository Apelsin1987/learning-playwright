import { type Locator, type Page, expect } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly subjectSelect: Locator;
  readonly messageInput: Locator;
  readonly sendButton: Locator;
  readonly alertSuccess: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subjectSelect = page.getByTestId("subject");
    this.messageInput = page.getByTestId("message");
    this.sendButton = page.getByTestId("contact-submit");
    this.alertSuccess = page.locator(".alert-success");
  }

  async goto() {
    await this.page.goto("/contact");
  }

  async sendMessage(subject: string, message: string) {
    await this.subjectSelect.selectOption(subject);
    await this.messageInput.fill(message);
    await this.sendButton.click();
    await expect(this.alertSuccess).toBeVisible();
  }
}
