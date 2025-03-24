'use server'

import { AddFilament } from "@/types";
import { createClient } from "@/utils/supabase/server";

export async function fetch() {
    const supabase = await createClient();
    const { data, error } = await supabase.from('filaments').select();

    return { data, error };
}

export async function addFilament(values: AddFilament) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('filaments')
        .insert(values)
        .select()
        .single();

    console.log(data, error);

    return { data, error };
}
    