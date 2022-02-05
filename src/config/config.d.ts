type ColumnType = "text" | "image" | "boolean" | "list" | "date" | "markdown";

interface Column {
  name: string;
  type: ColumnType;
  label?: string;
  hideInTable?: boolean;
  align?: "left" | "right" | "center";
  bucket?: string;
}

interface Table {
  name: string;
  label: string;
  cols: Column[];
}

interface Bucket {
  name: string;
  label?: string;
}

export interface Config {
  appName: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  tables: Table[];
  buckets: Bucket[];
}
