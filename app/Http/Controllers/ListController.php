<?php

namespace App\Http\Controllers;

use App\User;
use App\ItemList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ItemList as ItemListResource;

class ListController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ItemListResource::collection(ItemList::where('created_by', Auth::user()->id)->orderBy('order')->get());
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

        $itemList = (new ItemList)->forceFill(
            $data + [
                'created_by' => Auth::user()->id,
                'updated_by' => Auth::user()->id,
            ]
        );

        $itemList->save();

        return new ItemListResource($itemList);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function show(ItemList $itemList)
    {
        return new ItemListResource($itemList);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ItemList $list)
    {
        $data = $request->validate([
            'name'  => 'required|string',
            'order' => 'integer',
        ]);

        $list->forceFill(
            $data + [
                'updated_by' => Auth::user()->id,
            ]
        );

        $list->save();

        return new ItemListResource($list);
    }

    /**
     * Update many lists at a time
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateMany(Request $request)
    {
        foreach ($request->all() as $itemList) {
            ItemList::where('uuid', $itemList['uuid'])->update([
                'order' => $itemList['order'],
                'updated_by' => Auth::user()->id,
            ]);
        }

        return response(null, 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ItemList  $itemList
     * @return \Illuminate\Http\Response
     */
    public function destroy(ItemList $list)
    {
        $list->delete();

        return response(null, 204);
    }
}
