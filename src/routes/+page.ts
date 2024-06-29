import { error } from '@sveltejs/kit'
import {api, getHeaders} from '$lib/store'

export async function load({fetch}) {
  try {
    const recipes = await fetch(`${api}recipes?limit=4`, getHeaders()).then(res => res.json())
    if (recipes) {
      return {recipes}
    }
    return {recipes: []}
  } catch (err: any) {
    error(404, 'Failed to load recipes: ' + err.message)
  }
}
