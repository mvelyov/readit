/* globals window */
$(function () {
    var $elementAfter = $("#allComments");
    var postId = window.location.pathname.match(/[0-9]/g);
    postId = postId.join("");
    var subreaditname = window.location.pathname.replace("/r/", "")
        .replace("/post/", "").replace(postId.toString(), "");

    var commentBuilder = function (model) {
        var arrOfComments = model.postInfo.comments;
        var loggedUserId = model.loggedUserId;
        var postInfo = model.postInfo;
        arrOfComments.forEach(function (comment) {
            var $mediaDiv = $("<div>").addClass("media");
            var $mediaLeft = $("<div>").addClass("media-left commentLeft");
            var $aImg = $("<a/>").attr("href", "#");
            var $avatarImg = $("<img/>").attr("src", comment.userAvatar)
                .addClass("media-object mediumAvatar img-circle");
            var $mediaBody = $("<div>").addClass("media-body commentBody");
            var $aUser = $("<a/>").addClass("media-heading commentUser")
                .attr("href", "/user/" + comment.userName).text(comment.userName);
            var $pContent = $("<p>").addClass("commentContent").text(comment.content);
            var $pCreatedAgo = $("<p>").addClass("commentCreatedAt")
                .text("Created: " + comment.createdAgo);
            var $pUpdatedAgo = $("<p>").addClass("commentCreatedAt")
                .text("Last updated: " + comment.updatedAgo);
            var $holdingSpan = $("<span>");
            var $aEdit = $("<a/>").attr("href", "/edit/" + postInfo.subreaditName +
                "/post/comment/" + comment.id).text("Edit ").addClass("update");
            var $aDelete = $("<button/>").text("Delete")
                .data("id", comment.id).addClass("delete");

            $mediaDiv.appendTo($elementAfter);
            $mediaLeft.appendTo($mediaDiv);
            $aImg.appendTo($mediaLeft);
            $avatarImg.appendTo($aImg);
            $mediaBody.appendTo($mediaDiv);
            $aUser.appendTo($mediaBody);
            $pContent.appendTo($mediaBody);
            $pCreatedAgo.appendTo($mediaBody);
            if (comment.createdAgo !== comment.updatedAgo) {
                $pUpdatedAgo.appendTo($mediaBody);
            }
            $holdingSpan.appendTo($mediaBody);
            if (comment.userId === loggedUserId) {
                $aEdit.appendTo($holdingSpan);
                $aDelete.appendTo($holdingSpan);
            }
        });
    };

    var url = "/api/r/" + subreaditname + "/post/" + postId;
    var delUrl = "/api/r/" + subreaditname + "/post/" + postId + "/comment/";
    var loadAllComments = function () {
        $.ajax({
            method: "GET",
            async: true,
            url: url,
            beforeSend: function () {

                // todo
            },
            error: function () {

                // todo
            },
            success: function (info) {
                commentBuilder(info);
            }
        });
    };
    loadAllComments();
    $("#createComment").on("click", function() {
        var data = {
            content: $("#commentTxt").val()
        };
        $.ajax({
            method: "POST",
            async: true,
            data: data,
            url: url,
            success: function (info) {
                $elementAfter.empty();
                commentBuilder(info);
                $("#commentTxt").val("");
            }
        });
    });
    $elementAfter.on("click", ".delete", function() {
        var $divToDelete = $(this).closest("div.media");
        $.ajax({
            method: "DELETE",
            url: delUrl + $(this).data("id"),
            success: function () {
                $divToDelete.remove();
            }
        });
    });
});
