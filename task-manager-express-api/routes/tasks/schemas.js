import z from "zod";

export const TaskCreateSchema = z.object({
  body: z.object({
    task: z
      .string({
        required_error: "Task value is required",
      })
      .max(20),
    completed: z.boolean().optional(),
  }),
});

export const TaskUpdateSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Task id is required",
    }),
  }),
  body: z.object({
    task: z.string().max(20).optional(),
    completed: z.boolean().optional(),
  }),
});

export const TaskDeleteSchema = z.object({
  params: z.object({
    id: z.string({
      required_error: "Task id is required",
    }),
  }),
});
