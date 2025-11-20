export default class CollapseWidget {
  constructor(buttonId, contentId, copyTextClass) {
    this.button = document.getElementById(buttonId);
    this.content = document.getElementById(contentId);
    this.copyButton = document.querySelector(copyTextClass);
    this.isOpen = false;

    if (!this.button || !this.content || !this.copyButton) {
      console.error('Required elements not found');
      return;
    }

    this.boundToggle = this.toggle.bind(this);
    this.boundCopyContent = this.copyContent.bind(this);

    this.init();
  }

  init() {
    this.content.style.transition = 'max-height 0.3s ease-out, border-color 0.3s ease';
    this.content.style.overflow = 'hidden';
    this.content.style.maxHeight = '0';

    this.button.addEventListener('click', this.boundToggle);
    this.copyButton.addEventListener('click', this.boundCopyContent);
  }

  toggle() {
    if (this.isOpen) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  expand() {
    this.isOpen = true;
    this.content.style.maxHeight = this.content.scrollHeight + 'px';
    this.content.classList.add('expanded');
  }

  collapse() {
    this.isOpen = false;
    this.content.style.maxHeight = '0';
    this.content.classList.remove('expanded');
  }

  copyContent(e) {
    e.stopPropagation();

    const textToCopy =
      this.content.querySelector('.content-text')?.textContent.trim();

    if (!textToCopy) return;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        const originalText = this.copyButton.textContent;
        this.copyButton.textContent = 'Copied!';
        setTimeout(() => {
          this.copyButton.textContent = originalText;
        }, 2000);
      })
      .catch(err => console.error('Failed to copy text: ', err));
  }

  destroy() {
    if (this.button && this.boundToggle) {
      this.button.removeEventListener('click', this.boundToggle);
    }

    if (this.copyButton && this.boundCopyContent) {
      this.copyButton.removeEventListener('click', this.boundCopyContent);
    }

    this.button = null;
    this.content = null;
    this.copyButton = null;

    this.boundToggle = null;
    this.boundCopyContent = null;

    this.isOpen = null;
  }
}
