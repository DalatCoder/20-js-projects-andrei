function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const boundDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return boundDescriptor;
}

interface Quote {
  quoteAuthor: string;
  quoteText: string;
}

class App {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLDivElement;
  twitterBtn: HTMLButtonElement;
  newBtn: HTMLButtonElement;
  quoteElement: HTMLSpanElement;
  authorElement: HTMLSpanElement;
  quote: Quote = { quoteAuthor: '', quoteText: '' };

  constructor() {
    this.templateElement = document.getElementById(
      'quote-container'
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('root')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLDivElement;
    this.twitterBtn = this.element.querySelector(
      '#twitter'
    )! as HTMLButtonElement;
    this.newBtn = this.element.querySelector(
      '#new-quote'
    )! as HTMLButtonElement;
    this.quoteElement = this.element.querySelector(
      '#quote'
    )! as HTMLSpanElement;
    this.authorElement = this.element.querySelector(
      '#author'
    )! as HTMLSpanElement;

    this.configure();
    this.attach();
  }

  @autobind
  private async fetchQuote() {
    try {
      const proxy = 'https://dalatcoder-proxy-server.herokuapp.com/';
      const apiUrl =
        'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

      const response = await fetch(proxy + apiUrl);
      this.quote = (await response.json()) as Quote;

      this.quote.quoteAuthor = this.quote.quoteAuthor || 'Unknown';

      if (this.quote.quoteText.length > 120) {
        this.quoteElement.classList.add('long-quote');
      } else {
        this.quoteElement.classList.remove('long-quote');
      }

      this.renderContent();
    } catch (err) {
      console.log('Oops, error while fetching quote!', err.message);
    }
  }

  @autobind
  private tweetPost() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${this.quote.quoteText} - ${this.quote.quoteAuthor}.`;
    window.open(twitterUrl, '_blank');
  }

  private renderContent() {
    this.quoteElement.textContent = this.quote.quoteText;
    this.authorElement.textContent = this.quote.quoteAuthor;
  }

  private configure() {
    this.newBtn.addEventListener('click', this.fetchQuote);
    this.twitterBtn.addEventListener('click', this.tweetPost);
  }

  private attach() {
    this.hostElement.appendChild(this.element);
  }
}

new App();
