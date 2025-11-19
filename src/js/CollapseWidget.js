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
    
    this.init();
  }

  init() {
    // Set initial state
    this.content.style.transition = 'max-height 0.3s ease-out, border-color 0.3s ease';
    this.content.style.overflow = 'hidden';
    this.content.style.maxHeight = '0';
    
    // Add event listeners
    this.button.addEventListener('click', () => this.toggle());
    this.copyButton.addEventListener('click', (e) => this.copyContent(e));
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
    e.stopPropagation(); // Prevent toggle when clicking copy button
    const textToCopy = this.content.querySelector('.content-text').textContent.trim();
    
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
}
