type ResourceType = "video" | "audio" | "article";

interface ISermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  duration: string;
  resourceType: ResourceType;
  resourceUrl: string;
  addedBy: string;
  createdAt: string;
  updatedAt: string;
}

interface ICreateSermon {
  title: string;
  speaker: string;
  date: string;
  duration: string;
  resourceType: ResourceType;
  resourceUrl: string;
  addedBy: string;
}

export { ISermon, ICreateSermon };
