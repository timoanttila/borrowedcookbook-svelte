<script lang="ts">
  import { currentPage, defaultImage, host, siteName } from '$lib/store';
  import type { RecipeQuery } from '$lib/types';

  const description =
    'A website created as a personal recipe book that will hopefully bring joy to others as well. Everyone can be a top chef in their own life.';
  export let data: { recipes: RecipeQuery | null };

  $currentPage = {
    canonical: host,
    description,
    image: defaultImage,
    breadcrumb: [{ name: 'Home', item: host, position: '1' }],
    metaTitle: `${siteName} | The best recipes on the internet`,
    title: siteName,
  };
</script>

<div id="hero" class="relative">
  <img
    class="block h-full object-cover w-full"
    src={defaultImage}
    height="654"
    width="1502"
    alt="A plate of food with a variety of ingredients. The main dish is grilled steak, which has been cooked to perfection and is surrounded by an array of vegetables. On the left side of the plate there is a bowl filled with brown sauce, adding flavor to the meal. To the right side are two potatoes - one stuffed with cheese and bacon, and another that appears plain."
  />

  <div id="captionGradient" class="absolute h-full left-0 top-0 w-full">
    <div id="caption" class="absolute bottom-10 left-0 w-full">
      <div class="max-w-screen-md mx-auto px-6 text-center">
        <h1
          class="font-how font-light leading-tight mb-4 mt-0 px-6 text-6xl text-white"
        >
          {siteName}
        </h1>
      </div>
    </div>
  </div>
</div>

<div class="max-w-screen-xl mx-auto px-4 py-10">
  <h2 class="mb-10 title uppercase">Newest recipies</h2>

  {#if Array.isArray(data.recipes?.data) && data.recipes.data.length > 0}
    <div
      aria-busy="false"
      aria-label="List of newest recipes"
      class="gap-4 grid xl:grid-cols-2 font-content leading-normal"
      id="recipeList"
      role="feed"
    >
      {#each data.recipes.data as recipe, index}
        <article
          aria-labelledby={`recipe-title-${index + 1}`}
          aria-posinset={index + 1}
          aria-setsize={data.recipes.data.length}
        >
          <div class="image">
            <img
              alt={`Recipe: ${recipe.title}`}
              decoding="async"
              height="360"
              loading="lazy"
              srcset={`${recipe.image.w307.url} 307w, ${recipe.image.w360.url} 360w, ${recipe.image.w448.url} 448w`}
              sizes="(max-width: 360px) 360px, (max-width: 750px) 448px, (max-width: 1280px) 360px, 307px"
              src={recipe.image.w307.url}
              width="360"
            />
          </div>

          <div class="content">
            <h3 id={`recipe-title-${index + 1}`}>
              {recipe.title}
            </h3>
            <div class="description">{recipe.description}</div>
            <a
              href={`/recipes/${recipe.slug}`}
              aria-labelledby={`recipe-title-${index + 1}`}>Read more</a
            >
          </div>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style scoped>
  article {
    border-radius: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 0 #0000;
    display: grid;
    margin: 0 auto;
  }

  article,
  article .image {
    overflow: hidden;
  }

  article a {
    background-color: #1c6758;
    border-radius: 25px;
    color: #fff;
    display: inline-block;
    font-size: 0.95rem;
    margin-top: 1.5rem;
    padding: 0.8rem 2rem;
    text-decoration: none;
    text-transform: uppercase;
  }

  article h3 {
    font-size: 1.8rem;
    margin: 0 0 1rem;
  }

  article img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  @media screen and (min-width: 750px) {
    article {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: center;
      max-height: 320px;
      max-width: 725px;
    }

    article .content {
      padding: 1.5rem;
    }

    article .image {
      height: 100%;
    }
  }

  @media screen and (max-width: 750px) {
    article {
      max-width: 450px;
    }

    article .content {
      padding: 1rem;
    }

    article .image {
      aspect-ratio: 4 / 3;
    }
  }
</style>
