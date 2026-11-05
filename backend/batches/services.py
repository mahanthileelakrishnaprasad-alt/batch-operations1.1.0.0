from math import ceil

from .data import BATCHES


def filter_batches(search="", status="", centre=""):
    """Apply search + filters together (AND logic) on the mock list."""
    term = search.strip().lower()
    results = BATCHES

    if term:
        results = [
            b for b in results
            if term in b["batch_code"].lower() or term in b["course_name"].lower()
        ]
    if status:
        results = [b for b in results if b["status"].lower() == status.lower()]
    if centre:
        results = [b for b in results if b["centre_name"].lower() == centre.lower()]
    return results


def paginate(items, page, limit):
    total_records = len(items)
    total_pages = max(1, ceil(total_records / limit))
    page = min(page, total_pages)  # never point past the last page
    start = (page - 1) * limit
    pagination = {
        "page": page,
        "limit": limit,
        "totalRecords": total_records,
        "totalPages": total_pages,
    }
    return items[start:start + limit], pagination


def list_centres():
    return sorted({b["centre_name"] for b in BATCHES})
