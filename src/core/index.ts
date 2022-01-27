import config from "../../supacms.config";
import { supa } from "../supabase";

export const fetchBuckets = async () => {
  const { data, error } = await supa.storage.listBuckets();

  return data;
};

export const fetchBucketFiles = async (bucketName: string) => {
  const files = [];

  const { data, error } = await supa.storage.from(bucketName).list(undefined, {
    limit: 100,
    offset: 0,
    sortBy: { column: "created_at", order: "desc" },
  });

  data?.forEach((file) => {
    const url = supa.storage.from(bucketName).getPublicUrl(file.name);

    files.push({
      ...file,
      ...url,
    });
  });

  return files;
};
