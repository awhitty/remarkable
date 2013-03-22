<div id="{{hash}}" class="remarks">
    <div data-hash="{{hash}}" class="add-comment">
        <textarea data-hash="{{hash}}" class="comment-field required" placeholder="What do you think?"></textarea>
        <span class="next-step" style="display: none;">
            <div class="remark-login">
                    <input class="name" type="text" placeholder="Name">
                    <input class="email" type="text" placeholder="Email">
            </div>
            <button data-hash="{{hash}}"><i class="icon-plus"></i> Add comment</button>
        </span>

    </div>

    <ul class="comments">
    </ul>

    {{! If you really want to remove this line, go for it, but please feel very guilty. }}
    <div class="homage">powered by <a href="http://remarkablejs.com" >Remarkable</a></div>
</div>