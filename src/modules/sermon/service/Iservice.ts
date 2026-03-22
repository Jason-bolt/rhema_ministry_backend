import { ISermon } from "../types";

interface IService {
  create: (data: any) => Promise<any>;
  getSermonsCount: () => Promise<{
    value: number;
  }>;
  getSermons: () => Promise<ISermon[]>;
  read: (id: string) => Promise<void>;
  update: (id: string, data: any) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export default IService;
