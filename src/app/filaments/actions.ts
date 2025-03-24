'use server'

import { AddFilament, UpdateFilament } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addFilament(values: AddFilament) {
    const supabase = await createClient();

    const { data: { user} } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User is not authenticated");
    }

    values.user_id = user.id;

    const { error } = await supabase.from('filaments').insert(values);

    throw new Error("Failed to add filament");
    
    if (error) {
        console.log(error);
        throw new Error("Failed to add filament");
    }

    revalidatePath('/filaments');
}

export async function updateFilament(values: UpdateFilament) {
    const supabase = await createClient();
    const { error } = await supabase.from('filaments').update(values).eq('id', values.id);

    if (error) {
        throw new Error("Failed to update filament");
    }

    revalidatePath('/filaments');
}

export async function deleteFilament(id: string) {
    console.log(id);

    const supabase = await createClient();
    const { error } = await supabase.from('filaments').delete().eq('id', id);

    if (error) {
        throw new Error("Failed to delete filament");
    }

    revalidatePath('/filaments');
}
    