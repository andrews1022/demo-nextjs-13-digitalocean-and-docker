import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/drizzle/config";
import { notes } from "@/drizzle/schema";

const schema = z.object({
  name: z.string().min(1),
  content: z.string().min(1),
  color: z.string().min(1)
});

const getNotes = async () => {
  try {
    const nts = await db.select().from(notes);

    return nts;
  } catch (error) {
    throw new Error("Something went wrong when fetching notes!");
  }
};

const colorVariants = {
  blue: "bg-blue-200",
  green: "bg-green-200",
  purple: "bg-purple-200",
  yellow: "bg-yellow-200"
};

const NotesPage = async () => {
  const createNote = async (formData: FormData) => {
    "use server";

    // validate data
    const validated = schema.parse({
      name: formData.get("name"),
      content: formData.get("content"),
      color: formData.get("color")
    });

    try {
      await db.insert(notes).values({
        name: validated.name,
        content: validated.content,
        color: validated.color
      });

      revalidatePath("/notes");

      return {
        message: "Note created successfully!",
        revalidated: true,
        now: Date.now()
      };
    } catch (error) {
      return {
        message: "Something went wrong when creating the note!"
      };
    }
  };

  const nts = await getNotes();

  return (
    <div>
      <h1>NotesPage</h1>

      <form
        className="inline-flex items-start flex-col space-y-4 border-solid border-black border-2 p-4 mt-2 w-80"
        action={createNote}
      >
        <div className="w-full">
          <label htmlFor="name" className="block">
            Name:
          </label>

          <input
            id="name"
            name="name" // IMPORTANT: MAKE SURE TO INCLUDE A NAME FOR INPUTS
            type="text"
            className="border-solid border-black border-2 block w-full"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="content" className="block">
            Content:
          </label>

          <textarea
            id="content"
            name="content"
            className="border-solid border-black border-2 block w-full"
            required
          />
        </div>

        <div className="w-full">
          <label htmlFor="color" className="block">
            Color:
          </label>

          <select
            id="color"
            name="color"
            className="border-solid border-black border-2 block w-full"
            required
          >
            <option value="">Select Color</option>
            <option value="yellow">Yellow</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
          </select>
        </div>

        <button
          className="border-solid border-black border-2 py-1 px-4 hover:bg-black hover:text-white w-full"
          type="submit"
        >
          Create Note
        </button>
      </form>

      <div className="mt-4">
        <h2 className="text-2xl">Notes</h2>

        <ul className="grid gap-4 grid-cols-12">
          {nts.length
            ? nts.map((nt) => {
                // @ts-ignore
                const colorClasses = colorVariants[nt.color];

                return (
                  <li key={nt.id} className={`${colorClasses} col-span-2 p-4 rounded-lg`}>
                    <h3 className="text-xl font-semibold mb-1">{nt.name}</h3>
                    <p>{nt.content}</p>
                  </li>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
};

export default NotesPage;
