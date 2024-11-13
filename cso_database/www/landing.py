
import frappe


no_cache = 1

expected_keys = (
	"amount",
	
)


def get_context(context):
	context.no_cache = 1