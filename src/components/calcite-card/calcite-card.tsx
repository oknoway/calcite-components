import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop
} from "@stencil/core";
import { CSS, SLOTS } from "./resources";
import { ENTER, SPACE } from "../../utils/keys";
import { getElementDir } from "../../utils/dom";
import { VNode } from "@stencil/core/dist/declarations";

/**
 * @slot thumbnail - [Required] A slot for adding a thumnail to the card.
 * @slot header - [Required] A slot for adding a heading and an icon to the card.
 * @slot - A slot for adding subheader/description content.
 * @slot title - A slot for adding a card title.
 * @slot subtitle - A slot for adding a card subtitle or short summary.
 * @slot footer-leading - A slot for adding a leading footer.
 * @slot footer-trailing - A slot for adding a trailing footer.
 */

@Component({
  tag: "calcite-card",
  styleUrl: "calcite-card.scss",
  shadow: true
})
export class CalciteCard {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLCalciteCardElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /**  true, the card can't be clicked and is visually muted.  */
  @Prop({ reflect: true }) disabled: boolean = false;

  /**  When true, the cards content is waiting to be loaded. This state shows a busy indicator.*/
  @Prop({ reflect: true }) loading: boolean = false;

  /**
   * Indicates whether the image's height is respected for the crop of the thumbnail.
   * When false (default), the image fills the whole thumbnail space.
   * When true, the height of the thumbnail is used to crop and may not fill the container for the thumbnail.
   */
  @Prop({ reflect: true }) respectImageHeight: boolean = false;

  /** Indicates whether the card is selected. */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /** Indicates whether the card is selectable. */
  @Prop({ reflect: true, mutable: true }) selectable: boolean = false;

  /**  The theme of the card.*/
  @Prop({ reflect: true, mutable: true }) theme: "light" | "dark" = "light";

  /**  The appearance of the card. */
  @Prop({ reflect: true, mutable: true }) appearance: "wide" | "default" =
    "wide";

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when a selectable card is selected */
  @Event() calciteCardSelected: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback() {
    let themes = ["dark", "light"];
    if (!themes.includes(this.theme)) this.theme = "light";
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <a>
          {this.loading ? (
            <calcite-loader
              class="calcite-card-loader"
              is-active
            ></calcite-loader>
          ) : null}
          <section class={{ [CSS.container]: true }} aria-busy={this.loading}>
            {this.selectable ? this.renderCheckbox() : null}
            {this.renderThumbnail()}
            {this.renderHeader()}
            <div class="card-content">
              <slot />
            </div>
            {this.renderFooter()}
          </section>
        </a>
      </Host>
    );
  }
  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------

  private cardSelectClick() {
    this.selectCard();
  }

  private cardSelectKeyDown(e) {
    switch (e.keyCode) {
      case SPACE:
      case ENTER:
        this.selectCard();
        e.preventDefault();
        break;
    }
  }

  private selectCard() {
    this.selected = !this.selected;
    this.calciteCardSelected.emit({
      element: this.el as HTMLCalciteCardElement,
      selected: this.selected
    });
  }

  private renderThumbnail(): VNode {
    const hasThumbnail = this.el.querySelector(`[slot=${SLOTS.thumbnail}]`);
    return hasThumbnail ? (
      <div class={CSS.thumbnailWrapper}>
        <slot name={SLOTS.thumbnail} />
      </div>
    ) : null;
  }

  private renderCheckbox(): VNode {
    return (
      <div
        class="card-checkbox-wrapper"
        onClick={() => this.cardSelectClick()}
        onKeyDown={e => this.cardSelectKeyDown(e)}
      >
        <calcite-checkbox checked={this.selected}></calcite-checkbox>
      </div>
    );
  }

  private renderHeader(): VNode {
    const title = this.el.querySelector(`[slot=${SLOTS.title}]`);
    const subtitle = this.el.querySelector(`[slot=${SLOTS.subtitle}]`);
    const hasHeader = title || subtitle;

    return hasHeader ? (
      <header class={CSS.header}>
        <slot name={SLOTS.title} />
        <slot name={SLOTS.subtitle} />
      </header>
    ) : null;
  }

  private renderFooter(): VNode {
    const leadingFooter = this.el.querySelector(
      `[slot=${SLOTS.footerLeading}]`
    );
    const trailingFooter = this.el.querySelector(
      `[slot=${SLOTS.footerTrailing}]`
    );

    const hasFooter = leadingFooter || trailingFooter;
    return hasFooter ? (
      <footer class={CSS.footer}>
        <slot name={SLOTS.footerLeading} />
        <slot name={SLOTS.footerTrailing} />
      </footer>
    ) : null;
  }
}