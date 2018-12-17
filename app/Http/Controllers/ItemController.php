<?php

namespace App\Http\Controllers;

use App\Item;
use App\Http\Resources\Item as ItemResource;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ItemResource::collection(Item::orderBy('order')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'order' => 'integer',
        ]);

        $item = (new Item)->forceFill(
            $data + [
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
            ]
        );

        $item->save();

        return new ItemResource($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item $item)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'order' => 'integer',
        ]);

        if ($request->has('complete')) {
            if ($request->complete) {
                $item->completeBy(new User(['id' => 1]));
            } else {
                $item->incomplete();
            }
        }

        $item->forceFill(
            $data + [
                'updated_by' => Auth::user()->id,
            ]
        );

        $item->save();

        return new ItemResource($item);
    }

    /**
     * Update many items at a time
     *
     * @param Request $request
     */
    public function updateMany(Request $request)
    {
        foreach ($request->all() as $item) {
            Item::where('uuid', $item['uuid'])->update(['order' => $item['order'], 'updated_by' => Auth::user()->id]);
        }

        return response(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Item $item)
    {
        $item->delete();
    }
}
