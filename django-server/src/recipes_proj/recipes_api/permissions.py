from rest_framework import permissions

class ViewOwnProfile(permissions.BasePermission):
    """Allow users to edit only their own profile"""

    def has_object_permission(self, request, view, obj):
        """Check if the user is trying to edit their own profile"""
        return request.method in permissions.SAFE_METHODS and obj.id == request.user.id