from django.test import SimpleTestCase


class BatchApiTests(SimpleTestCase):
    url = "/api/batches"

    def test_default_pagination(self):
        body = self.client.get(self.url).json()
        self.assertTrue(body["success"])
        self.assertEqual(len(body["data"]), 5)
        self.assertEqual(body["pagination"]["totalRecords"], 12)
        self.assertEqual(body["pagination"]["totalPages"], 3)

    def test_search_by_code_and_course(self):
        by_code = self.client.get(self.url, {"search": "b-2401"}).json()
        self.assertEqual(by_code["pagination"]["totalRecords"], 1)
        by_course = self.client.get(self.url, {"search": "django"}).json()
        self.assertEqual(by_course["pagination"]["totalRecords"], 2)

    def test_filters_work_together(self):
        body = self.client.get(
            self.url, {"status": "Running", "centre": "Hyderabad", "search": "django"}
        ).json()
        self.assertEqual([b["batch_code"] for b in body["data"]], ["B-2410"])

    def test_invalid_status_returns_400(self):
        response = self.client.get(self.url, {"status": "Nope"})
        self.assertEqual(response.status_code, 400)

    def test_post_not_allowed(self):
        self.assertEqual(self.client.post(self.url).status_code, 405)

    def test_centres(self):
        body = self.client.get(self.url + "/centres").json()
        self.assertIn("London-HQ", body["data"])
