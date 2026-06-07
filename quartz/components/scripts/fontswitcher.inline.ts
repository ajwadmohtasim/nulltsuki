type FontPreset = "default" | "serif" | "mono"

const presets: FontPreset[] = ["default", "serif", "mono"]
const presetLabels: Record<FontPreset, string> = {
  default: "Default font",
  serif: "Serif font",
  mono: "Monospace font",
}

const storageKey = "font-preset"
const initialPreset = (localStorage.getItem(storageKey) as FontPreset | null) ?? "default"
document.documentElement.setAttribute("saved-font", initialPreset)

document.addEventListener("nav", () => {
  const updateButtonLabels = (preset: FontPreset) => {
    const nextPreset = presets[(presets.indexOf(preset) + 1) % presets.length]
    for (const button of document.getElementsByClassName("fontswitcher")) {
      const htmlButton = button as HTMLButtonElement
      htmlButton.ariaLabel = `Current: ${presetLabels[preset]}. Click for ${presetLabels[nextPreset]}.`
      htmlButton.title = `Font: ${presetLabels[preset]}`
    }
  }

  const switchFont = () => {
    const current =
      (document.documentElement.getAttribute("saved-font") as FontPreset | null) ?? "default"
    const nextPreset = presets[(presets.indexOf(current) + 1) % presets.length]
    document.documentElement.setAttribute("saved-font", nextPreset)
    localStorage.setItem(storageKey, nextPreset)
    updateButtonLabels(nextPreset)
  }

  const activePreset =
    (document.documentElement.getAttribute("saved-font") as FontPreset | null) ?? "default"
  updateButtonLabels(activePreset)

  for (const button of document.getElementsByClassName("fontswitcher")) {
    button.addEventListener("click", switchFont)
    window.addCleanup(() => button.removeEventListener("click", switchFont))
  }
})
