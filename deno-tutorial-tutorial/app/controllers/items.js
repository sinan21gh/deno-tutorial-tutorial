import { createItem, getItems } from "../models/items.js";
import render from "../render.js";
import { itemsView } from "../views/items.js";
import redirect from "../redirect.js";

export function itemsController(ctx) {
    const { errors, request } = ctx;

    const url = new URL(request.url);
    const search = url.searchParams.get("search");

    let items = getItems();

    if (search) {
        items = items.filter(item =>
            item.label.toLowerCase().includes(search.toLowerCase())
        );
    }

    return render(itemsView, { items, errors }, ctx);
}

export function addItemController(ctx, next) {
    const { headers, isValid, validated } = ctx;
    if (!isValid) return next(ctx);
    const newItem = validated['new-item'];
    createItem(newItem);
    console.log("new item added");
    
    return redirect(headers, '/items', `added '${newItem}' to the list`)
}

