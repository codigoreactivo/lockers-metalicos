export interface MenuItem {
  path: string;
  label: string;
  children?: MenuItem[];
}

export const menuItems: MenuItem[] = [
  {
    path: "/",
    label: "Somos Fabrinsa"
  },
  {
    path: "/productos",
    label: "Productos"
  },
  {
    path: "/categorias",
    label: "Categorías",
    children: [
      { path: "/categorias/cajas-fuertes", label: "Cajas Fuertes" },
      { path: "/categorias/cerraduras", label: "Cerraduras" },
      { path: "/categorias/cofres", label: "Cofres" }
    ]
  },
  {
    path: "/servicios",
    label: "Servicios"
  },
  {
    path: "/ofertas",
    label: "Ofertas"
  }
]; 