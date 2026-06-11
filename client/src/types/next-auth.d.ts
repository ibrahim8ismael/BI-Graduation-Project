import type { Role } from "@/lib/auth/roles";

declare module "@auth/core/types" {
  interface User {
    role: Role;
  }
}
