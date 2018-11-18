from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class AnonymousPermissionOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user.is_authenticated()
