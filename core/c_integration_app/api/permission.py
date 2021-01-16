from rest_framework import permissions


class MerchantAllowedOnly(permissions.BasePermission):
    message = 'Merchant Users Only '
    def has_permission(self , request , view):
        return request.user.is_merchant
            