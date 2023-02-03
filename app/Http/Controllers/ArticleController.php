<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class ArticleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $articles = Article::where('user_id', auth()->user()->id)->latest()->get();

        return Inertia::render('Article/Index', compact('articles'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return Inertia::render('Article/Create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => "required|min:5",
            'body' => "required",
        ]);

        if ($request->file('image')) {
            $image = $request->file('image')->store('images');
        }

        Article::create([
            'user_id' => $request->id,
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'image' => $image ?? null
        ]);

        return redirect('/article')->with('success', 'Successfully Created Article');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function show(Article $article)
    {
        // return $article;
        return Inertia::render('Article/Detail', compact('article'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function edit(Article $article)
    {
        return Inertia::render('Article/Edit', compact('article'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\Request  $request
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Article $article)
    {
        $request->validate([
            'title' => "required|min:5",
            'body' => "required",
        ]);

        if ($request->file('image')) {
            File::delete(public_path("$article->image"));

            $image = $request->file('image')->store('images');
        }

        $article->update([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'body' => $request->body,
            'image' => $image ?? $article->image,
        ]);

        return redirect('/article')->with('success', 'Successfully Edited Article');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Article  $article
     * @return \Illuminate\Http\Response
     */
    public function destroy(Article $article)
    {
        $article->delete();
        return back()->with('info', 'Successfully Deleted Article');
    }
}
