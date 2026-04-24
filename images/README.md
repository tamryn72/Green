# Image drop-ins

Drop files with these exact names into this folder and they'll appear automatically on the page. Missing files are hidden — no broken-image icons.

| Filename | Where it appears |
|---|---|
| `strains-hero.jpg` | Top of the Strains section |
| `indoor-setup.jpg` | Top of the Indoor Growing section |
| `outdoor.jpg` | Top of the Outdoor Growing section |
| `pests.jpg` | Top of the Pests & Disease section |
| `harvest.jpg` | Top of the Harvest & Cure section |

JPG, PNG, or WebP are fine — keep them under ~800 KB for fast page loads.

To add more image slots elsewhere, copy this block and rename the file:

```html
<figure class="photo-slot">
  <img src="images/YOUR-FILE.jpg" alt="" onerror="this.remove()">
  <figcaption>Caption here</figcaption>
</figure>
```
