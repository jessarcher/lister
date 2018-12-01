<?php

namespace App\Http\Controllers;

use App\Item;
use App\ItemList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Item as ItemResource;

class ListItemController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function index(ItemList $itemList)
    {
        return ItemResource::collection($itemList->items()->orderBy('order')->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, ItemList $itemList)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'order' => 'integer',
        ]);

        $item = (new Item)->forceFill(
            $data + [
                'list_id' => $itemList->getKey(),
                'created_by' => 1,
                'updated_by' => 1,
                // 'created_by' => Auth::user()->id,
                // 'updated_by' => Auth::user()->id,
            ]
        );

        $item->save();

        return new ItemResource($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ItemList  $itemList
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(ItemList $itemList, Item $item)
    {
        return new ItemResource($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ItemList  $itemList
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ItemList $itemList, Item $item)
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
                'updated_by' => 1,
                // 'updated_by' => Auth::user()->id,
            ]
        );

        $item->save();

        return new ItemResource($item);
    }

    /**
     * Update many items at a time
     *
     * @param  Request  $request
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function updateMany(Request $request, ItemList $itemList)
    {
        foreach ($request->all() as $item) {
            Item::where('uuid', $item['uuid'])->update(['order' => $item['order']]);
        }

        return response(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ItemList  $itemList
     * @param  \App\Item  $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(ItemList $itemList, Item $item)
    {
        $item->delete();

        return response(null, 204);
    }
}
