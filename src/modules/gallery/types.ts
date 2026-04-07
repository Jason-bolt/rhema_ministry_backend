interface IGalleryGroup {
  id: string;
  name: string;
  coverUrl: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface ICreateGalleryGroup {
  name: string;
  coverUrl?: string;
  images: string[];
}

export { IGalleryGroup, ICreateGalleryGroup };
