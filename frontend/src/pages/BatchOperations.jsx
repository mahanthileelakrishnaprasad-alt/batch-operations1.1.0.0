import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";
import FilterBar from "../components/FilterBar.jsx";
import BatchTable from "../components/BatchTable.jsx";
import Pagination from "../components/Pagination.jsx";
import useDebounce from "../hooks/useDebounce.js";
import { fetchBatches, fetchCentres } from "../services/batchService.js";

const PAGE_SIZE = 5;
const EMPTY_PAGINATION = { page: 1, limit: PAGE_SIZE, totalRecords: 0, totalPages: 1 };

export default function BatchOperations() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [centre, setCentre] = useState("");
  const [page, setPage] = useState(1);

  const [batches, setBatches] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [centres, setCentres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const debouncedSearch = useDebounce(search);

  // Any change to search/filters sends the user back to page 1.
  const withPageReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  useEffect(() => {
    fetchCentres().then(setCentres).catch(() => setCentres([]));
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError("");

    fetchBatches(
      { page, limit: PAGE_SIZE, search: debouncedSearch, status, centre },
      controller.signal
    )
      .then((res) => {
        setBatches(res.data);
        setPagination(res.pagination);
        if (res.pagination.page !== page) setPage(res.pagination.page);
      })
      .catch((err) => {
        if (err.code === "ERR_CANCELED") return; // superseded by a newer request
        setBatches([]);
        setPagination(EMPTY_PAGINATION);
        setError("Could not load batches. Check that the backend is running.");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [page, debouncedSearch, status, centre, reloadKey]);

  const resetFilters = useCallback(() => {
    setSearch("");
    setStatus("");
    setCentre("");
    setPage(1);
  }, []);

  return (
    <>
      <header className="page-header">
        <h1>Batch Operations</h1>
        <button type="button" className="create-btn">
          <Plus size={16} /> Create Batch
        </button>
      </header>

      <section className="card">
        <FilterBar
          search={search} onSearchChange={withPageReset(setSearch)}
          status={status} onStatusChange={withPageReset(setStatus)}
          centre={centre} onCentreChange={withPageReset(setCentre)}
          centres={centres}
          onReset={resetFilters}
        />
      </section>

      <section className="card table-card">
        <BatchTable
          batches={batches}
          loading={loading}
          error={error}
          onRetry={() => setReloadKey((k) => k + 1)}
        />
        <Pagination pagination={pagination} onPageChange={setPage} />
      </section>
    </>
  );
}
