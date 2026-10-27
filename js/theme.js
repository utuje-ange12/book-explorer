// Book theme: paper, leather and burgundy, with Playfair Display and Lora
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                serif: ['"Playfair Display"', "Georgia", "serif"], // headings
                sans: ["Lora", "Georgia", "serif"],                // body text
            },
            colors: {
                paper: "#F6EFE2",
                page: "#FFFBF2",
                ink: "#2A1F17",
                leather: "#3A2619",
                brass: "#B8924A",
                burgundy: { DEFAULT: "#7B1E2B", dark: "#5E1520" },
            },
        },
    },
};