function _array_like_to_array(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function _array_with_holes(arr) {
    if (Array.isArray(arr)) return arr;
}
function _array_without_holes(arr) {
    if (Array.isArray(arr)) return _array_like_to_array(arr);
}
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function _create_class(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}
function _iterable_to_array(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
function _iterable_to_array_limit(arr, i) {
    var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
    if (_i == null) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _s, _e;
    try {
        for(_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function _non_iterable_rest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _non_iterable_spread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _sliced_to_array(arr, i) {
    return _array_with_holes(arr) || _iterable_to_array_limit(arr, i) || _unsupported_iterable_to_array(arr, i) || _non_iterable_rest();
}
function _to_consumable_array(arr) {
    return _array_without_holes(arr) || _iterable_to_array(arr) || _unsupported_iterable_to_array(arr) || _non_iterable_spread();
}
function _type_of(obj) {
    "@swc/helpers - typeof";
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
}
function _unsupported_iterable_to_array(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _array_like_to_array(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(n);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _array_like_to_array(o, minLen);
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = function(target, all) {
    for(var name in all)__defProp(target, name, {
        get: all[name],
        enumerable: true
    });
};
var __copyProps = function(to, from, except, desc) {
    if (from && typeof from === "object" || typeof from === "function") {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            var _loop = function() {
                var key = _step.value;
                if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
                    get: function() {
                        return from[key];
                    },
                    enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
                });
            };
            for(var _iterator = __getOwnPropNames(from)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true)_loop();
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
    return to;
};
var __toCommonJS = function(mod) {
    return __copyProps(__defProp({}, "__esModule", {
        value: true
    }), mod);
};
// lib/lib.ts
var lib_exports = {};
__export(lib_exports, {
    JSX: function() {
        return jsx_default;
    },
    attach: function() {
        return attach;
    },
    default: function() {
        return lib_default;
    },
    onDomReady: function() {
        return onDomReady;
    },
    useEffect: function() {
        return useEffect;
    },
    useReference: function() {
        return useReference;
    },
    useState: function() {
        return useState;
    }
});
module.exports = __toCommonJS(lib_exports);
// lib/debug.ts
var Debug = {
    isRenderDebug: true,
    isHooksDebug: true
};
// lib/utils.ts
var nextElementId = 0;
var componentsNodes = {};
function getNextComponentId() {
    var id = nextElementId;
    nextElementId++;
    return id;
}
function calculateDependenciesHash(dependencies) {
    var result = "";
    for(var i in dependencies){
        var dependency = dependencies[i];
        result += dependency.toString();
    }
    return result;
}
var isComponent = function(p) {
    return !!p.isComponent;
};
function createDocumentFragment(nodes) {
    var _fragment;
    var fragment = new DocumentFragment();
    (_fragment = fragment).append.apply(_fragment, _to_consumable_array(nodes));
    return fragment;
}
function renderComponents(elements) {
    var children = [];
    for(var i in elements){
        var _children;
        (_children = children).push.apply(_children, _to_consumable_array(renderComponent(elements[i])));
    }
    return children;
}
function renderComponent(element) {
    var children = [];
    if (!element) {
        return children;
    }
    switch(typeof element === "undefined" ? "undefined" : _type_of(element)){
        case "object":
            if (isComponent(element)) {
                var _children;
                (_children = children).push.apply(_children, _to_consumable_array(element.render()));
            } else if (Array.isArray(element)) {
                var _children1;
                (_children1 = children).push.apply(_children1, _to_consumable_array(renderComponents(element)));
            } else {
                console.error("unknown object to render");
            }
            break;
        default:
            console.error("unknown child to render", typeof element === "undefined" ? "undefined" : _type_of(element));
    }
    return children;
}
function reRenderElement(component) {
    if (!componentsNodes[component.id]) {
        console.error("no element to re-render in DOM storage", component.id);
        throw new Error("no element to re-render in DOM storage");
    }
    var _componentsNodes_component_id = _sliced_to_array(componentsNodes[component.id], 2), _ = _componentsNodes_component_id[0], nodes = _componentsNodes_component_id[1];
    if (nodes.length < 1) {
        console.error("no nodes to re-render in DOM storage", component.id);
        throw new Error("no nodes to re-render in DOM storage");
    }
    var firstNode = nodes[0];
    if (Debug.isRenderDebug) {
        console.group("[RE-RENDER]", component.id, "[NODE]", firstNode, "[PARENT]", firstNode ? firstNode.parentNode : null, "[CHILDREN]", nodes);
    }
    var removeNodes = function(el) {
        delete componentsNodes[el.id];
        if (el.props.children) {
            for(var i in el.props.children){
                var childElem = el.props.children[i];
                removeNodes(childElem);
            }
        }
    };
    var newNodes = component.render();
    var fragment = createDocumentFragment(newNodes);
    if (nodes.length > 1) {
        for(var i = 1; i < nodes.length; i++){
            firstNode.parentNode.removeChild(nodes[i]);
        }
    }
    firstNode.parentElement.replaceChild(fragment, firstNode);
    removeNodes(component);
    componentsNodes[component.id] = [
        component,
        newNodes
    ];
    if (Debug.isRenderDebug) {
        console.groupEnd();
    }
}
function onDomReady(cb) {
    if (document.readyState === "complete" || document.readyState === "interactive") {
        cb();
    } else {
        document.addEventListener("DOMContentLoaded", function(event) {
            cb();
        });
    }
}
function attach(root, component) {
    var nodes = component.render();
    var fragment = createDocumentFragment(nodes);
    root.appendChild(fragment);
    componentsNodes[component.id] = [
        component,
        nodes
    ];
}
// lib/TextComponent.ts
var TextComponent = /*#__PURE__*/ function() {
    "use strict";
    function TextComponent(text) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _class_call_check(this, TextComponent);
        this.isComponent = true;
        this.id = getNextComponentId();
        this.text = text;
        this.props = props;
    }
    _create_class(TextComponent, [
        {
            key: "render",
            value: function render() {
                if (Debug.isRenderDebug) {
                    console.group("[RENDER]", this.id, "[TEXT]", this.text, "with props", this.props);
                }
                var textNode = document.createTextNode(this.text);
                if (Debug.isRenderDebug) {
                    console.groupEnd();
                }
                return [
                    textNode
                ];
            }
        }
    ]);
    return TextComponent;
}();
// lib/HookState.ts
var HooksState = /*#__PURE__*/ function() {
    "use strict";
    function HooksState() {
        _class_call_check(this, HooksState);
        this.states = {};
        this.references = {};
        this.effects = {};
        this.currentComponent = void 0;
        this.nextHookIndex = 0;
        this.stack = [];
    }
    _create_class(HooksState, [
        {
            key: "enterState",
            value: function enterState(element) {
                if (this.currentComponent) {
                    this.stack.push([
                        this.currentComponent,
                        this.nextHookIndex
                    ]);
                }
                if (Debug.isHooksDebug) {
                    console.group("[DISPATCHER]", element);
                }
                this.currentComponent = element;
            }
        },
        {
            key: "exitState",
            value: function exitState() {
                if (this.stack.length > 0) {
                    var ref;
                    ref = _sliced_to_array(this.stack.pop(), 2), this.currentComponent = ref[0], this.nextHookIndex = ref[1], ref;
                } else {
                    this.currentComponent = void 0;
                    this.nextHookIndex = 0;
                }
                if (Debug.isHooksDebug) {
                    console.groupEnd();
                }
            }
        },
        {
            key: "getCurrentState",
            value: function getCurrentState() {
                var id = this.nextHookIndex;
                this.nextHookIndex++;
                return [
                    this.currentComponent,
                    id
                ];
            }
        }
    ]);
    return HooksState;
}();
var hooksState = new HooksState();
// lib/FunctionComponent.ts
var FunctionComponent = /*#__PURE__*/ function() {
    "use strict";
    function FunctionComponent(func) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _class_call_check(this, FunctionComponent);
        this.isComponent = true;
        this.id = getNextComponentId();
        this.func = func;
        this.props = props;
    }
    _create_class(FunctionComponent, [
        {
            key: "render",
            value: function render() {
                if (Debug.isRenderDebug) {
                    console.group("[RENDER]", this.id, "[FUNCTION]", "with props", this.props);
                }
                var functionResult = this.func(this.props);
                hooksState.enterState(this);
                var nodes = functionResult.render();
                hooksState.exitState();
                componentsNodes[this.id] = [
                    this,
                    nodes
                ];
                if (Debug.isRenderDebug) {
                    console.groupEnd();
                }
                return nodes;
            }
        }
    ]);
    return FunctionComponent;
}();
// lib/FragmentComponent.ts
var FragmentComponent = /*#__PURE__*/ function() {
    "use strict";
    function FragmentComponent() {
        var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
        _class_call_check(this, FragmentComponent);
        this.isComponent = true;
        this.id = getNextComponentId();
        this.props = props;
    }
    _create_class(FragmentComponent, [
        {
            key: "render",
            value: function render() {
                if (Debug.isRenderDebug) {
                    console.group("[RENDER]", this.id, "[FRAGMENT]", "with props", this.props);
                }
                var nodes = renderComponents(this.props.children);
                if (Debug.isRenderDebug) {
                    console.groupEnd();
                }
                return nodes;
            }
        }
    ]);
    return FragmentComponent;
}();
// lib/TagComponent.ts
var TagComponent = /*#__PURE__*/ function() {
    "use strict";
    function TagComponent(tag) {
        var props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        _class_call_check(this, TagComponent);
        this.isComponent = true;
        this.id = getNextComponentId();
        this.tag = tag;
        this.props = props;
    }
    _create_class(TagComponent, [
        {
            key: "render",
            value: function render() {
                if (Debug.isRenderDebug) {
                    console.group("[RENDER]", this.id, "[TAG]", this.tag, "with props", this.props);
                }
                var childrenWithNodes = [];
                if (this.props.children) {
                    for(var i in this.props.children){
                        var child = this.props.children[i];
                        var nodes = renderComponent(child);
                        childrenWithNodes.push([
                            child,
                            nodes
                        ]);
                    }
                }
                var tagNode = document.createElement(this.tag);
                for(var key in this.props){
                    if (key === "children") {
                        continue;
                    }
                    var value = this.props[key];
                    if (Debug.isRenderDebug) {
                        console.log("[TAG]", tagNode, "[PROP]", key, "[VALUE]", value);
                    }
                    if (typeof value === "function") {
                        tagNode[key] = value;
                    } else {
                        tagNode.setAttribute(key, value.toString());
                    }
                }
                for(var i1 in childrenWithNodes){
                    var _childrenWithNodes_i = _sliced_to_array(childrenWithNodes[i1], 2), child1 = _childrenWithNodes_i[0], nodes1 = _childrenWithNodes_i[1];
                    if (child1.props.$ref && nodes1.length > 1) {
                        console.error("too many nodes for $ref", child1);
                        throw new Error("too many nodes for $ref");
                    } else if (child1.props.$ref) {
                        var node = nodes1[0];
                        var addedNode = tagNode.appendChild(node);
                        child1.props.$ref(addedNode);
                    } else {
                        for(var n in nodes1){
                            var node1 = nodes1[n];
                            tagNode.appendChild(node1);
                        }
                    }
                }
                if (Debug.isRenderDebug) {
                    console.groupEnd();
                }
                return [
                    tagNode
                ];
            }
        }
    ]);
    return TagComponent;
}();
// lib/jsx.ts
var JSX = {
    createElement: function createElement(element, props) {
        for(var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++){
            children[_key - 2] = arguments[_key];
        }
        props = props || {};
        var elements = [];
        for(var i in children){
            var child = children[i];
            switch(typeof child === "undefined" ? "undefined" : _type_of(child)){
                case "string":
                    elements.push(new TextComponent(child));
                    break;
                case "number":
                    elements.push(new TextComponent(child.toString()));
                    break;
                case "boolean":
                    elements.push(new TextComponent(child.toString()));
                    break;
                case "object":
                    if (isComponent(child)) {
                        elements.push(child);
                    } else if (Array.isArray(child)) {
                        var _elements;
                        (_elements = elements).push.apply(_elements, _to_consumable_array(child));
                    } else {
                        console.error("unknown object to render");
                    }
                    break;
                case "undefined":
                    break;
                default:
                    console.error("unknown child", typeof child === "undefined" ? "undefined" : _type_of(child));
            }
        }
        props.children = elements;
        if (typeof element === "function") {
            return new FunctionComponent(element, props);
        } else if (element === void 0) {
            return new FragmentComponent(props);
        } else {
            return new TagComponent(element, props);
        }
    }
};
var jsx_default = JSX;
// lib/useState.ts
function useState(initialValue) {
    var _hooksState_getCurrentState = _sliced_to_array(hooksState.getCurrentState(), 2), component = _hooksState_getCurrentState[0], hookId = _hooksState_getCurrentState[1];
    if (!hooksState.states[component.id]) {
        hooksState.states[component.id] = {};
    }
    if (!hooksState.states[component.id][hookId]) {
        hooksState.states[component.id][hookId] = initialValue;
    }
    if (Debug.isHooksDebug) {
        console.info("[USE STATE]", component.id, "[HOOK ID]", hookId, "[ELEMENT]", component);
    }
    var set = function(newValue) {
        if (Debug.isHooksDebug) {
            console.info("[SET STATE]", component.id, "[HOOK ID]", hookId, "[NEW VALUE]", newValue);
        }
        hooksState.states[component.id][hookId] = newValue;
        reRenderElement(component);
    };
    return [
        hooksState.states[component.id][hookId],
        set
    ];
}
// lib/useEffect.ts
function useEffect(effect, dependencies) {
    var _hooksState_getCurrentState = _sliced_to_array(hooksState.getCurrentState(), 2), jsxElement = _hooksState_getCurrentState[0], hookId = _hooksState_getCurrentState[1];
    if (!hooksState.effects[jsxElement.id]) {
        hooksState.effects[jsxElement.id] = {};
    }
    var hash = calculateDependenciesHash(dependencies);
    if (!hooksState.effects[jsxElement.id][hookId]) {
        hooksState.effects[jsxElement.id][hookId] = [
            hash,
            effect
        ];
        effect();
    } else {
        var _hooksState_effects_jsxElement_id_hookId = _sliced_to_array(hooksState.effects[jsxElement.id][hookId], 2), currentHash = _hooksState_effects_jsxElement_id_hookId[0], currentEffect = _hooksState_effects_jsxElement_id_hookId[1];
        if (currentHash != hash) {
            hooksState.effects[jsxElement.id][hookId] = [
                hash,
                effect
            ];
            currentEffect();
        }
    }
}
// lib/useReference.ts
function useReference() {
    var _hooksState_getCurrentState = _sliced_to_array(hooksState.getCurrentState(), 2), jsxElement = _hooksState_getCurrentState[0], hookId = _hooksState_getCurrentState[1];
    if (!hooksState.references[jsxElement.id]) {
        hooksState.references[jsxElement.id] = {};
    }
    if (!hooksState.references[jsxElement.id][hookId]) {
        hooksState.references[jsxElement.id][hookId] = void 0;
    }
    var getReference = function() {
        return hooksState.references[jsxElement.id][hookId];
    };
    var setReference = function(x) {
        hooksState.references[jsxElement.id][hookId] = x;
    };
    return [
        getReference,
        setReference
    ];
}
// lib/lib.ts
var lib_default = jsx_default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
    JSX: JSX,
    attach: attach,
    onDomReady: onDomReady,
    useEffect: useEffect,
    useReference: useReference,
    useState: useState
});
