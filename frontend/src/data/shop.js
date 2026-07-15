import { IMAGES } from "../assets/images-list"

export const shopData = {
  shop: {
    columns: [
        {
          title: "SHOP BY PRODUCTS",
          items: [
            {name: "View All"},
            {name: "Best Sales"},
            {name: "New Arrivals"},
            {name: "Top Rated"},
            {name: "Most Popular"},
            {name: "Trending Products"}
          ]
        },
        {
          title: "SHOP BY FEEL",
          items: [
            {img: IMAGES.cargo_pants_badge, name: "Summer Vibes"},
            {img: IMAGES.top2, name: "Winter Vibes"},
            {img: IMAGES.jacket3, name: "Sporty Vibes"},
            {img: IMAGES.stylish, name: "Stylish Vibes"}
          ]
        },
    ],
    stacks:{
          title: "SHOP BY CATEGORY",
          items: [
            {img: IMAGES.jacket, name: "Jackets"},
            {img: IMAGES.top, name: "Tops"},
            {img: IMAGES.cargo_pants, name: "Cargo Pants"},
            {img: IMAGES.sport_outfit, name: "Sport Outfits"}
          ]
        },
    
    banners: IMAGES.sport_outfit
  }
}