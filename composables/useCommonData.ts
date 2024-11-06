const data = {
  home: {
    title: "EventHorizon",
  },
  notFound: {
    title: "Erreur 404",
    description: "Vous vous êtes perdus ?",
  },
  links: {
    dev: "https://github.com/oiimrosabel",
    github: "https://github.com/oiimrosabel/EventHorizon",
    pfp: "https://avatars.githubusercontent.com/u/42437280?v=4",
    credits: "https://github.com/oiimrosabel/EventHorizon/blob/main/README.md",
  },
  bundles: {
    bookmarksDeletion: "Sauvegardes effacées avec succès.",
    copy: {
      success: "Copié avec succès.",
      failure: "Votre navigateur ne supporte pas la copie.",
    },
    share: {
      title: "EventHorizon",
      success: "Partagé avec succès",
    },
    theme: {
      themeChange: "Thème changé avec succès.",
      colorChange: "Teinte changée avec succès.",
    },
  },
};

export const useCommonData = () => data;
