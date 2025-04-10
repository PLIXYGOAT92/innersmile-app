export const categories = {
  1: {
    id: 1,
    title: "Examens et stress",
    description: "Discutez de vos inquiétudes concernant les examens et le stress académique",
    color: "#FF6B6B",
    context: "Je suis un conseiller spécialisé dans la gestion du stress et la préparation aux examens. Je peux vous aider à gérer votre anxiété et à développer des stratégies d'étude efficaces.",
    exampleTopics: [
      "Comment gérer le stress avant un examen important ?",
      "Techniques de révision efficaces",
      "Gestion du temps pendant les périodes d'examens",
      "Comment surmonter l'anxiété de performance ?"
    ]
  },
  2: {
    id: 2,
    title: "Isolement",
    description: "Partagez vos expériences sur l'isolement et trouvez du soutien",
    color: "#4ECDC4",
    context: "Je suis un conseiller spécialisé dans les relations sociales et la gestion de l'isolement. Je peux vous aider à développer des stratégies pour créer des liens et surmonter la solitude.",
    exampleTopics: [
      "Comment créer des liens dans un nouvel environnement ?",
      "Surmonter la timidité en milieu universitaire",
      "Trouver des activités sociales qui vous correspondent",
      "Gérer le sentiment de solitude"
    ]
  },
  3: {
    id: 3,
    title: "Harcèlement",
    description: "Discutez des situations de harcèlement et trouvez du soutien",
    color: "#FFD166",
    context: "Je suis un conseiller spécialisé dans la prévention et la gestion du harcèlement. Je peux vous aider à identifier les situations de harcèlement et à trouver des solutions appropriées.",
    exampleTopics: [
      "Comment reconnaître une situation de harcèlement ?",
      "Que faire si je suis victime de harcèlement ?",
      "Comment soutenir un ami victime de harcèlement ?",
      "Ressources disponibles pour les victimes de harcèlement"
    ]
  },
  4: {
    id: 4,
    title: "Relations",
    description: "Discutez de vos relations personnelles et amicales",
    color: "#06D6A0",
    context: "Je suis un conseiller spécialisé dans les relations interpersonnelles. Je peux vous aider à naviguer dans vos relations amicales et amoureuses de manière saine et constructive.",
    exampleTopics: [
      "Comment gérer les conflits dans une relation ?",
      "Établir des limites saines dans les relations",
      "Communication efficace dans les relations",
      "Gérer les ruptures et les changements relationnels"
    ]
  },
  5: {
    id: 5,
    title: "Famille",
    description: "Discutez des défis et des relations familiales",
    color: "#118AB2",
    context: "Je suis un conseiller spécialisé dans les relations familiales. Je peux vous aider à naviguer dans les dynamiques familiales complexes et à trouver des solutions constructives.",
    exampleTopics: [
      "Comment gérer les conflits familiaux ?",
      "Établir une communication saine avec sa famille",
      "Gérer les attentes familiales pendant les études",
      "Trouver un équilibre entre indépendance et liens familiaux"
    ]
  },
  6: {
    id: 6,
    title: "Bien-être",
    description: "Discutez de votre bien-être mental et physique",
    color: "#073B4C",
    context: "Je suis un conseiller spécialisé dans le bien-être mental et physique. Je peux vous aider à développer des habitudes saines et à maintenir un équilibre dans votre vie quotidienne.",
    exampleTopics: [
      "Comment maintenir un bon équilibre vie-études ?",
      "Techniques de gestion du stress au quotidien",
      "Développer une routine de bien-être efficace",
      "Prendre soin de sa santé mentale pendant les études"
    ]
  }
};

export const getCategoryById = (id) => {
  return categories[id] || null;
}; 