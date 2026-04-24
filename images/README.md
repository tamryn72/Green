# Image drop-ins

Drop files with these exact names into this folder and they'll appear automatically on the page. Missing files are hidden (the whole figure is removed) &mdash; no broken-image icons, no "drop a file here" captions for public visitors.

| Filename | Where it appears |
|---|---|
| `strains-hero.jpg` | Top of the Strains section |
| `indoor-setup.jpg` | Top of the Indoor Growing section |
| `outdoor.jpg` | Top of the Outdoor Growing section |
| `pests.jpg` | Top of the Pests & Disease section |
| `harvest.jpg` | Top of the Harvest & Cure section |
| `stage-veg.jpg` | Grow Stages &mdash; left tile |
| `stage-flower.jpg` | Grow Stages &mdash; right tile |

JPG, PNG, or WebP all work. **Please compress before committing** &mdash; raw phone photos are 4&ndash;8 MB each and will make the page slow on mobile. Aim for ~800 KB (or under 200 KB if you can manage, using a tool like [squoosh.app](https://squoosh.app)).

To add more image slots elsewhere, copy this block and rename the file:

```html
<figure class="photo-slot">
  <img src="images/YOUR-FILE.jpg" alt="Describe the photo" loading="lazy"
       onerror="this.closest('figure').remove()">
  <figcaption>Optional caption</figcaption>
</figure>
```
