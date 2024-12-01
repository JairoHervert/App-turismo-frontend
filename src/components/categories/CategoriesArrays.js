
const places = [
  // Deportes
  { category: "Deportes", imagen: "1", name: "Lugar Deportivo 1", description: "Descripción larga del lugar deportivo 1." },
  { category: "Deportes", imagen: "2", name: "Lugar Deportivo 2", description: "Descripción larga del lugar deportivo 2." },
  { category: "Deportes", imagen: "3", name: "Lugar Deportivo 3", description: "Descripción larga del lugar deportivo 3." },
  { category: "Deportes", imagen: "4", name: "Lugar Deportivo 4", description: "Descripción larga del lugar deportivo 4." },
  { category: "Deportes", imagen: "5", name: "Lugar Deportivo 5", description: "Descripción larga del lugar deportivo 5." },
  { category: "Deportes", imagen: "6", name: "Lugar Deportivo 6", description: "Descripción larga del lugar deportivo 6." },

  // Comida Rápida
  { category: "Comida Rápida", imagen: "1", name: "Lugar de Comida Rápida 1", description: "Este restaurante de comida rápida es conocido por sus deliciosas hamburguesas y papas fritas. El servicio es rápido y eficiente, y los precios son razonables. Es un lugar perfecto para una comida rápida y sabrosa." },
  { category: "Comida Rápida", imagen: "2", name: "Lugar de Comida Rápida 2", description: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo pizzas, sándwiches y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },
  { category: "Comida Rápida", imagen: "3", name: "Lugar de Comida Rápida 3", description: "Este restaurante de comida rápida es conocido por sus deliciosos tacos y burritos. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y eficiente. Es un lugar perfecto para una comida rápida y sabrosa." },
  { category: "Comida Rápida", imagen: "4", name: "Lugar de Comida Rápida 4", description: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo pollo frito, hamburguesas y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },
  { category: "Comida Rápida", imagen: "5", name: "Lugar de Comida Rápida 5", description: "Este restaurante de comida rápida es conocido por sus deliciosas pizzas y pastas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y eficiente. Es un lugar perfecto para una comida rápida y sabrosa." },
  { category: "Comida Rápida", imagen: "6", name: "Lugar de Comida Rápida 6", description: "Un lugar de comida rápida que ofrece una amplia variedad de opciones, incluyendo sándwiches, wraps y ensaladas. Los ingredientes son frescos y de alta calidad, y el servicio es rápido y amable. Es un lugar ideal para una comida rápida y deliciosa." },

  // Restaurante
  { category: "Restaurante", imagen: "1", name: "Restaurante 1", description: "Este restaurante ofrece una experiencia gastronómica única con una amplia variedad de platos internacionales. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante." },
  { category: "Restaurante", imagen: "2", name: "Restaurante 2", description: "Un restaurante que ofrece una amplia variedad de platos locales e internacionales. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y memorable." },
  { category: "Restaurante", imagen: "3", name: "Restaurante 3", description: "Este restaurante es conocido por sus deliciosos mariscos y platos de pescado. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante y sabrosa." },
  { category: "Restaurante", imagen: "4", name: "Restaurante 4", description: "Un restaurante que ofrece una amplia variedad de platos vegetarianos y veganos. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y saludable." },
  { category: "Restaurante", imagen: "5", name: "Restaurante 5", description: "Este restaurante es conocido por sus deliciosos platos de carne y parrilladas. Los ingredientes son frescos y de alta calidad, y el servicio es excepcional. Es un lugar perfecto para una cena elegante y sabrosa." },
  { category: "Restaurante", imagen: "6", name: "Restaurante 6", description: "Un restaurante que ofrece una amplia variedad de platos italianos, incluyendo pastas, pizzas y risottos. Los ingredientes son frescos y de alta calidad, y el servicio es amable y eficiente. Es un lugar ideal para una comida deliciosa y memorable." },

  // Cafeteria
  { category: "Cafeteria", imagen: "1", name: "Cafeteria 1", description: "Esta cafetería es conocida por sus deliciosos cafés y pasteles. El ambiente es acogedor y relajante, y el servicio es amable y eficiente. Es un lugar perfecto para disfrutar de una taza de café y un pastel." },
  { category: "Cafeteria", imagen: "2", name: "Cafeteria 2", description: "Una cafetería que ofrece una amplia variedad de cafés, tés y pasteles. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una taza de café y un pastel." },
  { category: "Cafeteria", imagen: "3", name: "Cafeteria 3", description: "Esta cafetería es conocida por sus deliciosos desayunos y brunches. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar perfecto para disfrutar de una comida deliciosa y relajante." },
  { category: "Cafeteria", imagen: "4", name: "Cafeteria 4", description: "Una cafetería que ofrece una amplia variedad de sándwiches, ensaladas y pasteles. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una comida deliciosa y relajante." },
  { category: "Cafeteria", imagen: "5", name: "Cafeteria 5", description: "Esta cafetería es conocida por sus deliciosos helados y postres. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar perfecto para disfrutar de un postre delicioso y relajante." },
  { category: "Cafeteria", imagen: "6", name: "Cafeteria 6", description: "Una cafetería que ofrece una amplia variedad de bebidas frías y calientes, así como pasteles y postres. Los ingredientes son frescos y de alta calidad, y el ambiente es acogedor y relajante. Es un lugar ideal para disfrutar de una bebida y un postre." },

  // Bar
  { category: "Bar", imagen: "1", name: "Bar 1", description: "Este bar es conocido por sus deliciosos cócteles y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
  { category: "Bar", imagen: "2", name: "Bar 2", description: "Un bar que ofrece una amplia variedad de bebidas, incluyendo cervezas, vinos y cócteles. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },
  { category: "Bar", imagen: "3", name: "Bar 3", description: "Este bar es conocido por sus deliciosas tapas y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
  { category: "Bar", imagen: "4", name: "Bar 4", description: "Un bar que ofrece una amplia variedad de bebidas y aperitivos. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },
  { category: "Bar", imagen: "5", name: "Bar 5", description: "Este bar es conocido por sus deliciosas cervezas artesanales y su ambiente animado. El servicio es amable y eficiente, y los precios son razonables. Es un lugar perfecto para disfrutar de una noche divertida con amigos." },
  { category: "Bar", imagen: "6", name: "Bar 6", description: "Un bar que ofrece una amplia variedad de bebidas y cócteles. El ambiente es animado y acogedor, y el servicio es amable y eficiente. Es un lugar ideal para disfrutar de una noche divertida con amigos." },

  // Arte
  { category: "Arte", imagen: "1", name: "Lugar de Arte 1", description: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
  { category: "Arte", imagen: "2", name: "Lugar de Arte 2", description: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte moderno y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },
  { category: "Arte", imagen: "3", name: "Lugar de Arte 3", description: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte clásico y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
  { category: "Arte", imagen: "4", name: "Lugar de Arte 4", description: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte contemporáneo y moderno. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },
  { category: "Arte", imagen: "5", name: "Lugar de Arte 5", description: "Este lugar de arte es conocido por sus impresionantes exposiciones de arte contemporáneo y moderno. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar perfecto para los amantes del arte." },
  { category: "Arte", imagen: "6", name: "Lugar de Arte 6", description: "Un lugar de arte que ofrece una amplia variedad de exposiciones de arte clásico y contemporáneo. Las obras de arte son únicas y provocativas, y el ambiente es inspirador. Es un lugar ideal para los amantes del arte." },

  // Historia
  { category: "Historia", imagen: "1", name: "Lugar Histórico 1", description: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
  { category: "Historia", imagen: "2", name: "Lugar Histórico 2", description: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },
  { category: "Historia", imagen: "3", name: "Lugar Histórico 3", description: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
  { category: "Historia", imagen: "4", name: "Lugar Histórico 4", description: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },
  { category: "Historia", imagen: "5", name: "Lugar Histórico 5", description: "Este lugar histórico es conocido por su rica historia y su impresionante arquitectura. Es un lugar perfecto para aprender sobre el pasado y disfrutar de la belleza del lugar." },
  { category: "Historia", imagen: "6", name: "Lugar Histórico 6", description: "Un lugar histórico que ofrece una amplia variedad de exposiciones y tours. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del lugar." },

  // Museos
  { category: "Museos", imagen: "1", name: "Museo 1", description: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
  { category: "Museos", imagen: "2", name: "Museo 2", description: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },
  { category: "Museos", imagen: "3", name: "Museo 3", description: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
  { category: "Museos", imagen: "4", name: "Museo 4", description: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },
  { category: "Museos", imagen: "5", name: "Museo 5", description: "Este museo es conocido por sus impresionantes colecciones de arte y artefactos históricos. Es un lugar perfecto para aprender sobre la historia y disfrutar de la belleza del arte." },
  { category: "Museos", imagen: "6", name: "Museo 6", description: "Un museo que ofrece una amplia variedad de exposiciones de arte y artefactos históricos. Es un lugar ideal para aprender sobre la historia y disfrutar de la belleza del arte." },

  // Educativos
  { category: "Educativos", imagen: "1", name: "Lugar Educativo 1", description: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
  { category: "Educativos", imagen: "2", name: "Lugar Educativo 2", description: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },
  { category: "Educativos", imagen: "3", name: "Lugar Educativo 3", description: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
  { category: "Educativos", imagen: "4", name: "Lugar Educativo 4", description: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },
  { category: "Educativos", imagen: "5", name: "Lugar Educativo 5", description: "Este lugar educativo es conocido por sus excelentes programas y su ambiente inspirador. Es un lugar perfecto para aprender y crecer." },
  { category: "Educativos", imagen: "6", name: "Lugar Educativo 6", description: "Un lugar educativo que ofrece una amplia variedad de programas y actividades. Es un lugar ideal para aprender y crecer." },

  // Compras
  { category: "Compras", imagen: "1", name: "Lugar de Compras 1", description: "Descripción del lugar de compras 1." },
  { category: "Compras", imagen: "2", name: "Lugar de Compras 2", description: "Descripción del lugar de compras 2." },
  { category: "Compras", imagen: "3", name: "Lugar de Compras 3", description: "Descripción del lugar de compras 3." },
  { category: "Compras", imagen: "4", name: "Lugar de Compras 4", description: "Descripción del lugar de compras 4." },
  { category: "Compras", imagen: "5", name: "Lugar de Compras 5", description: "Descripción del lugar de compras 5." },
  { category: "Compras", imagen: "6", name: "Lugar de Compras 6", description: "Descripción del lugar de compras 6." },

  // Parques
  { category: "Parques", imagen: "1", name: "Parque 1", description: "Descripción del parque 1." },
  { category: "Parques", imagen: "2", name: "Parque 2", description: "Descripción del parque 2." },
  { category: "Parques", imagen: "3", name: "Parque 3", description: "Descripción del parque 3." },
  { category: "Parques", imagen: "4", name: "Parque 4", description: "Descripción del parque 4." },
  { category: "Parques", imagen: "5", name: "Parque 5", description: "Descripción del parque 5." },
  { category: "Parques", imagen: "6", name: "Parque 6", description: "Descripción del parque 6." },

  // Juegos Recreativos al Aire Libre
  { category: "Juegos Recreativos al Aire Libre", imagen: "1", name: "Juego Recreativo al Aire Libre 1", description: "Descripción del juego recreativo al aire libre 1." },
  { category: "Juegos Recreativos al Aire Libre", imagen: "2", name: "Juego Recreativo al Aire Libre 2", description: "Descripción del juego recreativo al aire libre 2." },
  { category: "Juegos Recreativos al Aire Libre", imagen: "3", name: "Juego Recreativo al Aire Libre 3", description: "Descripción del juego recreativo al aire libre 3." },
  { category: "Juegos Recreativos al Aire Libre", imagen: "4", name: "Juego Recreativo al Aire Libre 4", description: "Descripción del juego recreativo al aire libre 4." },
  { category: "Juegos Recreativos al Aire Libre", imagen: "5", name: "Juego Recreativo al Aire Libre 5", description: "Descripción del juego recreativo al aire libre 5." },
  { category: "Juegos Recreativos al Aire Libre", imagen: "6", name: "Juego Recreativo al Aire Libre 6", description: "Descripción del juego recreativo al aire libre 6." },

  // Juegos Recreativos Bajo Techo
  { category: "Juegos Recreativos Bajo Techo", imagen: "1", name: "Juego Recreativo Bajo Techo 1", description: "Descripción del juego recreativo bajo techo 1." },
  { category: "Juegos Recreativos Bajo Techo", imagen: "2", name: "Juego Recreativo Bajo Techo 2", description: "Descripción del juego recreativo bajo techo 2." },
  { category: "Juegos Recreativos Bajo Techo", imagen: "3", name: "Juego Recreativo Bajo Techo 3", description: "Descripción del juego recreativo bajo techo 3." },
  { category: "Juegos Recreativos Bajo Techo", imagen: "4", name: "Juego Recreativo Bajo Techo 4", description: "Descripción del juego recreativo bajo techo 4." },
  { category: "Juegos Recreativos Bajo Techo", imagen: "5", name: "Juego Recreativo Bajo Techo 5", description: "Descripción del juego recreativo bajo techo 5." },
  { category: "Juegos Recreativos Bajo Techo", imagen: "6", name: "Juego Recreativo Bajo Techo 6", description: "Descripción del juego recreativo bajo techo 6." },

  // Zoológicos
  { category: "Zoológicos", imagen: "1", name: "Zoológico 1", description: "Descripción del zoológico 1." },
  { category: "Zoológicos", imagen: "2", name: "Zoológico 2", description: "Descripción del zoológico 2." },
  { category: "Zoológicos", imagen: "3", name: "Zoológico 3", description: "Descripción del zoológico 3." },
  { category: "Zoológicos", imagen: "4", name: "Zoológico 4", description: "Descripción del zoológico 4." },
  { category: "Zoológicos", imagen: "5", name: "Zoológico 5", description: "Descripción del zoológico 5." },
  { category: "Zoológicos", imagen: "6", name: "Zoológico 6", description: "Descripción del zoológico 6." },

  // Religión
  { category: "Religión", imagen: "1", name: "Lugar Religioso 1", description: "Descripción del lugar religioso 1." },
  { category: "Religión", imagen: "2", name: "Lugar Religioso 2", description: "Descripción del lugar religioso 2." },
  { category: "Religión", imagen: "3", name: "Lugar Religioso 3", description: "Descripción del lugar religioso 3." },
  { category: "Religión", imagen: "4", name: "Lugar Religioso 4", description: "Descripción del lugar religioso 4." },
  { category: "Religión", imagen: "5", name: "Lugar Religioso 5", description: "Descripción del lugar religioso 5." },
  { category: "Religión", imagen: "6", name: "Lugar Religioso 6", description: "Descripción del lugar religioso 6." },
];
export default places;
