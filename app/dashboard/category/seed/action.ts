"use server";

import prisma from "@/app/lib/db";

const categoryData = [
  {
    name: "VECTOR",
    description: "Scalable graphics and illustrations",
    imageString: "https://example.com/images/vector-icon.svg",
  },
  {
    name: "LOGO",
    description: "Brand identity and symbolic designs",
    imageString: "https://example.com/images/logo-samples.png",
  },
  {
    name: "DIGITAL",
    description: "Computer-generated artwork and designs",
    imageString: "https://example.com/images/digital-art.jpg",
  },
  {
    name: "MOCKUP",
    description: "Realistic product and design previews",
    imageString: "https://example.com/images/mockup-template.jpg",
  },
  {
    name: "ILLUSTRATION",
    description: "Artistic interpretations and drawings",
    imageString: "https://example.com/images/illustration-portfolio.jpg",
  },
  {
    name: "UX",
    description: "User experience design and interfaces",
    imageString: "https://example.com/images/ux-wireframe.png",
  },
  {
    name: "TYPOGRAPHY",
    description: "Font design and textual layouts",
    imageString: "https://example.com/images/typography-samples.svg",
  },
  {
    name: "BRANDING",
    description: "Comprehensive visual identity systems",
    imageString: "https://example.com/images/brand-guidelines.jpg",
  },
  {
    name: "PRINT",
    description: "Designs for physical media and publications",
    imageString: "https://example.com/images/print-portfolio.jpg",
  },
  {
    name: "3D",
    description: "Three-dimensional models and renderings",
    imageString: "https://example.com/images/3d-model-showcase.png",
  },
  {
    name: "MOTION",
    description: "Animated graphics and visual effects",
    imageString: "https://example.com/images/motion-reel-thumb.jpg",
  },
  {
    name: "UI",
    description: "User interface design for digital platforms",
    imageString: "https://example.com/images/ui-kit-preview.png",
  },
  {
    name: "INFOGRAPHIC",
    description: "Visual representations of data and information",
    imageString: "https://example.com/images/infographic-example.png",
  },
  {
    name: "PACKAGING",
    description: "Product packaging and label designs",
    imageString: "https://example.com/images/packaging-design.jpg",
  },
  {
    name: "WEB",
    description: "Website layouts and web graphics",
    imageString: "https://example.com/images/web-design-portfolio.jpg",
  },
  {
    name: "ICON",
    description: "Small, symbolic images representing actions or concepts",
    imageString: "https://example.com/images/icon-set.png",
  },
  {
    name: "EDITORIAL",
    description: "Magazine and book layout designs",
    imageString: "https://example.com/images/editorial-spread.jpg",
  },
  {
    name: "CONCEPT",
    description: "Early-stage visual ideas and sketches",
    imageString: "https://example.com/images/concept-art.jpg",
  },
  {
    name: "PHOTOGRAPHY",
    description: "Professional photo editing and manipulation",
    imageString: "https://example.com/images/photo-editing-before-after.jpg",
  },
  {
    name: "RESPONSIVE",
    description: "Designs that adapt to different screen sizes",
    imageString: "https://example.com/images/responsive-design-example.png",
  },
];

export const seedCategory = async () => {
  try {
    const res = await prisma.category.createMany({
      data: categoryData.map((category) => ({
        name: category.name,
        description: category.description,
        imageString: category.imageString,
      })),
    });
    console.log(res);
  } catch (error) {
    console.error(error);
  }
};
