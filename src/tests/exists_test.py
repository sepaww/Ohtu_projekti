import unittest

class Test_test_existance(unittest.TestCase):
    def setUp(self):
        self.val=1

    def test_applying(self):
        self.assertEqual(self.val, 1)

