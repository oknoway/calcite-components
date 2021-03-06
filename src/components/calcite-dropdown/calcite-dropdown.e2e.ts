import { newE2EPage } from "@stencil/core/testing";

describe("calcite-dropdown", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    expect(element).toHaveClass("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("alignment", "left");
    expect(group1).toEqualAttribute("selection-mode", "single");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown alignment="zip" scale="zop" theme="zut">
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="zap">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light");
    expect(element).toEqualAttribute("alignment", "left");
    expect(group1).toEqualAttribute("selection-mode", "single");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown alignment="right" scale="l" theme="dark">
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("alignment", "right");
    expect(group1).toEqualAttribute("selection-mode", "multi");
  });

  it("renders group title if specified and not if absent", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" group-title="My Group 1 Title">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-2">
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-4" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const group1Title = await page.find(
      "calcite-dropdown-group[id='group-1'] >>> .dropdown-title"
    );
    const group2Title = await page.find(
      "calcite-dropdown-group[id='group-2'] >>> .dropdown-title"
    );
    expect(group1Title).not.toBeNull();
    expect(group2Title).toBeNull();
  });

  it("renders active item based on attribute in dom", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
  });

  it("renders multiple active items when group is in multi selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    expect(group1).toEqualAttribute("selection-mode", "multi");
    await trigger.click();
    await item1.click();
    await trigger.click();
    await item2.click();
    await trigger.click();
    await item3.click();
    expect(item1).toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
  });

  it("renders just one active item when group is in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    expect(group1).toEqualAttribute("selection-mode", "single");
    await trigger.click();
    await item1.click();
    await trigger.click();
    await item3.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
  });

  it("renders no active item when group is in none selection mode (and removes any active state set in dom)", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="none">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    expect(group1).toEqualAttribute("selection-mode", "none");
    await trigger.click();
    await item1.click();
    await trigger.click();
    await item2.click();
    await trigger.click();
    await item3.click();
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
  });

  it("renders the correct active state when parent contains groups of assorted selection modes", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger" id="trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-2" selection-mode="single">
    <calcite-dropdown-item id="item-4">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-5" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-6">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-3" selection-mode="none">
    <calcite-dropdown-item id="item-7">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-8">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-9">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const group2 = await element.find("calcite-dropdown-group[id='group-2']");
    const group3 = await element.find("calcite-dropdown-group[id='group-3']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const item4 = await element.find("calcite-dropdown-item[id='item-4']");
    const item5 = await element.find("calcite-dropdown-item[id='item-5']");
    const item6 = await element.find("calcite-dropdown-item[id='item-6']");
    const item7 = await element.find("calcite-dropdown-item[id='item-7']");
    const item8 = await element.find("calcite-dropdown-item[id='item-8']");
    const item9 = await element.find("calcite-dropdown-item[id='item-9']");

    expect(group1).toEqualAttribute("selection-mode", "multi");
    expect(group2).toEqualAttribute("selection-mode", "single");
    expect(group3).toEqualAttribute("selection-mode", "none");

    await trigger.click();
    await item1.click();
    await trigger.click();
    await item2.click();
    await trigger.click();
    await item3.click();
    await trigger.click();
    await item4.click();
    await trigger.click();
    await item6.click();
    await trigger.click();
    await item7.click();
    await trigger.click();
    await item9.click();
    expect(item1).toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(item4).not.toHaveAttribute("active");
    expect(item5).not.toHaveAttribute("active");
    expect(item6).toHaveAttribute("active");
    expect(item7).not.toHaveAttribute("active");
    expect(item8).not.toHaveAttribute("active");
    expect(item9).not.toHaveAttribute("active");
  });
});
